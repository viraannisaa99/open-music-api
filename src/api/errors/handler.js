/* eslint-disable class-methods-use-this */
/* eslint-disable no-else-return */
const ClientError = require('../../exceptions/ClientError');

class ErrorHandler {
  errorHandler(request, h) {
    const { response } = request;

    // CLIENT ERROR
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;

      // Error tidak terduga
    } else if (response instanceof Error) {
      const { statusCode, payload } = response.output;
      if (statusCode === 401) {
        return h.response(payload).code(401); // unauthorized
      }
      if (statusCode === 413) {
        return h.response(payload).code(413); // entity max size
      }
      if (statusCode === 415) {
        return h.response(payload).code(415); // unsupported media
      }
      const newResponse = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan di sisi Server',
      });
      console.log(response);
      newResponse.code(500);
      return newResponse;
    }
    return response.continue || response;
  }
}

module.exports = ErrorHandler;
