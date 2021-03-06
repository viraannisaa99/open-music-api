const autoBind = require('auto-bind');

class PlaylistsHandler {
  constructor(playlistsService, songsService, validator) {
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._validator = validator;

    autoBind(this);
  }

  /**
   * Kriteria 5: Menambahkan Playlist
   * @param {*} request
   * @param {*} h
   * @returns playlistId
   */
  async postPlaylistHandler({ payload, auth }, h) {
    this._validator.validatePlaylistPayload(payload);

    const { name } = payload;
    const { id: credentialId } = auth.credentials; // get userId from JWT artifacts
    const playlistId = await this._playlistsService.addPlaylist({ name, owner: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId, // return id
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Kriteria 6: Melihat Daftar Playlist
   * @param {*} request
   * @returns playlists
   */
  async getPlaylistsHandler({ auth }) {
    const { id: credentialId } = auth.credentials;
    const playlists = await this._playlistsService.getPlaylists(credentialId);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  /**
   * Kriteria 7: Menghapus Playlist
   * @param {*} request
   * @returns
   */
  async deletePlaylistByIdHandler({ params, auth }) {
    const { playlistId } = params;
    const { id: credentialId } = auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId); // hanya owner yang bisa menghapus
    await this._playlistsService.deletePlaylistById(playlistId, credentialId);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  /**
   * Kriteria 8: Menambahkan Lagu ke Playlist
   * @param {*} request
   * @param {*} h
   * @returns
   */
  async postSongToPlaylistHandler({ payload, params, auth }, h) {
    this._validator.validatePlaylistSongPayload(payload);

    const { songId } = payload;
    const { playlistId } = params;
    const { id: credentialId } = auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId); // cek akses kolaborator
    await this._playlistsService.addSongToPlaylist({ playlistId, songId });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
    response.code(201);
    return response;
  }

  /**
   * Kriteria 9: Melihat Daftar Lagu di Playlist
   * @param {*} request
   * @returns songs
   */
  async getPlaylistSongsHandler({ params, auth }) {
    const { id: credentialId } = auth.credentials;
    const { playlistId } = params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const songs = await this._playlistsService.getSongsFromPlaylist(playlistId);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  /**
   * Kriteria 10: Menghapus Lagu dari Playlist
   * @param {*} request
   * @returns
   */
  async deletePlaylistSongsHandler({ payload, params, auth }) {
    const { playlistId } = params;
    const { songId } = payload;
    const { id: credentialId } = auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistsService.deleteSongFromPlaylistById(playlistId, songId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistsHandler;
