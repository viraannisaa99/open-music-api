const autoBind = require('auto-bind');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  /**
   * Kriteria 1: Menambahkan user
   * @param {*} payload
   * @param {*} h 
   * @returns userId
   */

  async postUserHandler({ payload }, h) {
    this._validator.validateUserPayload(payload);
    const userId = await this._service.addUser(payload); // username, password, fullname

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Get User
   * @param {*} request 
   * @returns user
   */
  async getUserByIdHandler({ params }) {
    const { id } = params;
    const user = await this._service.getUserById(id);
    return {
      status: 'success',
      data: {
        user,
      },
    };
  }
}

module.exports = UsersHandler;
