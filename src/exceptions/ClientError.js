/**
 * Kriteria 7 : Penanganan Eror (Error Handling)
 */
class ClientError extends Error {
  // 400 = error dari sisi client
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError'; // ERROR Bad Request
  }
}

module.exports = ClientError;
