const autoBind = require('auto-bind');

class ExportsHandler {
  constructor(service, playlistsService, validator) {
    this._service = service;
    this._playlistsService = playlistsService;
    this._validator = validator;

    autoBind(this);
  }

  /**
   * Kriteria 1: Export Lagu pada Playlist
   * @param {*} request
   * @param {*} h
   * @returns
   */
  async postExportSongsHandler(request, h) {
    this._validator.validateExportSongsPayload(request.payload);

    const { id: userId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);

    const message = {
      playlistId,
      targetEmail: request.payload.targetEmail,
    };

    await this._service.sendMessage('export:songs', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
