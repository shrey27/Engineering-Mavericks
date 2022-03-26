export const playlistDefaultState = {
  playloaderLoader: false,
  playlists: []
};

export const playlistReducerFunction = (state, action) => {
  switch (action.type) {
    case 'PLAYLIST_API_REQUEST':
      return {
        ...state,
        playloaderLoader: true
      };
    case 'PLAYLIST_API_RESPONSE':
      return {
        ...state,
        playlists: action.payload,
        playloaderLoader: false
      };
    default:
      return {
        ...state
      };
  }
};
