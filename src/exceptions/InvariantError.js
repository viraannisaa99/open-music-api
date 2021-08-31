const ClientError = require('./ClientError');

// error karena validasi data
class InvariantError extends ClientError {
  constructor(message) {
    super(message); // status 400 inheritance dari ClientError
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
