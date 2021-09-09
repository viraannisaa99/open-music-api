const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/pictures',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data', // konfigurasi multipart
        multipart: true,
        output: 'stream',
        maxBytes: 500000,
      },
    },
  },
  {
    method: 'GET', // jika ada permintaan masuk ke GET, maka akan dilayani oleh berkas statis yang ada di folder file sesuai dengan parameter yang diminta
    path: '/upload/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
];

module.exports = routes;
