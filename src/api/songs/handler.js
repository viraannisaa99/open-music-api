const autoBind = require('auto-bind');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  /**
   * Kriteria 1: Menambahkan lagu
   * @param {*} payload
   * @param {*} h
   * @returns id
   */
  async postSongHandler({ payload }, h) {
    this._validator.validateSongPayload(payload);

    const songId = await this._service.addSong(payload); // perbaikan dari submission 2

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Kriteria 2 : Menampilkan Seluruh
   * @returns songs
   */
  async getSongsHandler() {
    const songs = await this._service.getSongs();

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  /**
   * Kriteria 3 : API dapat menampilkan detail lagu
   * @param {*} request
   * @param {*} h
   * @returns id
   */
  async getSongByIdHandler({ params }) {
    const { id } = params;
    const song = await this._service.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  /**
   * Kriteria 4 : API dapat mengubah data lagu
   * @param {*} request
   * @param {*} h
   * @returns id
   */
  async putSongByIdHandler({ payload, params }, h) {
    this._validator.validateSongPayload(payload);

    const { id } = params;
    await this._service.editSongById(id, payload);
    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    };
  }

  /**
   * Kriteria 5 : API dapat menghapus data lagu
   * @param {*} request
   * @param {*} h
   * @returns id
   */
  async deleteSongByIdHandler({ params }, h) {
    const { id } = params;
    await this._service.deleteSongById(id);
    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = SongsHandler;
