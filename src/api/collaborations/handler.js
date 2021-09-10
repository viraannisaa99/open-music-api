const autoBind = require('auto-bind');

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    autoBind(this);
  }

  /**
   * Kriteria Opsional 1: Menambahkan Kolaborator ke Playlist
   * @param {*} request 
   * @param {*} h 
   * @returns collaborationId
   */
  async postCollaborationHandler({ payload, auth }, h) {
    this._validator.validateCollaborationPayload(payload);
    const { id: credentialId } = auth.credentials;
    const { playlistId, userId } = payload;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    const collaborationId = await this._collaborationsService.addCollaboration(playlistId, userId);

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collaborationId,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Kriteria Opsional 2: Menghapus Kolaborator dari Playlist
   * @param {*} request 
   * @param {*} h 
   * @returns 
   */
  async deleteCollaborationHandler({ payload, auth }) {
    this._validator.validateCollaborationPayload(payload);
    const { id: credentialId } = auth.credentials;
    const { playlistId, userId } = payload;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._collaborationsService.deleteCollaboration(playlistId, userId);

    return {
      status: 'success',
      message: 'Kolaborasi berhasil dihapus',
    };
  }
}

module.exports = CollaborationsHandler;
