const routes = (handler) => [
  // handler dimasukkan dalam paramerter fungsi
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler, // kombinasi method + path + Handler
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler, // plural
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler, // singular
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongByIdHandler,
  },
];

module.exports = routes;
