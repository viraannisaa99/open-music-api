const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapDBToSongModel } = require('../../utils/mapToModel');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addSong(payload) {
    const id = `song-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $7) RETURNING id',
      values: [id, ...Object.values(payload), insertedAt], // gunakan object destructuring (perbaikan submission 2)
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan lagu. Pastikan data sudah benar.');
    }

    await this._cacheService.delete('songs:songList');
    return result.rows[0].id;
  }

  async getSongs() {
    try {
      const result = await this._cacheService.get('songs:songList');
      return JSON.parse(result);
    } catch (error) {
      const result = await this._pool.query('SELECT id, title, performer FROM songs');

      await this._cacheService.set('songs:songList', JSON.stringify(result.rows));
      return result.rows;
    }
  }

  async getSongById(id) {
    try {
      const result = await this._cacheService.get(`songs:${id}`);
      return JSON.parse(result);
    } catch (error) {
      const query = {
        text: 'SELECT * FROM songs WHERE id = $1',
        values: [id],
      };
      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Gagal menemukan lagu. Id tidak ditemukan');
      }

      await this._cacheService.set(`songs:${id}`, JSON.stringify(result.rows));
      return result.rows.map(mapDBToSongModel)[0];
    }
  }

  async editSongById(id, { title, year, performer, genre, duration }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: ` UPDATE songs
              SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, updated_at = $6
              WHERE id = $7 
              RETURNING id `,
      values: [title, year, performer, genre, duration, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }

    await this._cacheService.delete(`songs:${id}`);
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus lagu. Id tidak ditemukan');
    }
    await this._cacheService.delete(`songs:${id}`);
  }
}

module.exports = SongsService;
