const autoBind = require('auto-bind');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    autoBind(this);
  }

  /**
   * Kriteria 2: Menambahkan Authentication
   * @param {*} payload
   * @param {*} h
   * @returns acessToken, refreshToken
   */
  async postAuthenticationHandler({ payload }, h) {
    this._validator.validatePostAuthenticationPayload(payload); // perbaikan dari submission 2
    const { username, password } = payload;

    const id = await this._usersService.verifyUserCredential(username, password);

    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    await this._authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Kriteria 3: Memperbarui Authentication (Refresh Token)
   * @param {*} payload
   * @param {*} h
   * @returns accessToken
   */
  async putAuthenticationHandler({ payload }) {
    this._validator.validatePutAuthenticationPayload(payload);

    const { refreshToken } = payload;
    await this._authenticationsService.verifyRefreshToken(refreshToken);
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ id });
    return {
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    };
  }

  /**
   * Kriteria 4: Menghapus Authentication (Logout)
   * @param {*} request
   * @param {*} h
   * @returns
   */
  async deleteAuthenticationHandler({ payload }) {
    this._validator.validateDeleteAuthenticationPayload(payload);

    const { refreshToken } = payload;
    await this._authenticationsService.verifyRefreshToken(refreshToken);
    await this._authenticationsService.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  }
}

module.exports = AuthenticationsHandler;
