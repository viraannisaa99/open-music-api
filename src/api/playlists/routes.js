const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler, 
    options: {
      auth: 'songsapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postSongToPlaylistHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getPlaylistSongsHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deletePlaylistSongsHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
];

module.exports = routes;
