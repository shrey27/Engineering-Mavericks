export const playlistDefaultState = {
  playloaderLoader: false,
  playlists: [],
  videoId: '',
  playlistId: []
};

export const playlistReducerFunction = (state, action) => {
  const { playlistId } = state;
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
    case 'ADD_VIDEO_ID':
      return {
        ...state,
        videoId: action.payload
      };
    case 'REMOVE_VIDEO_ID':
      return {
        ...state,
        videoId: ''
      };
    case 'ADD_PLAYLIST_ID':
      return {
        ...state,
        playlistId: [...playlistId, action.payload]
      };
    case 'REMOVE_PLAYLIST_ID':
      return {
        ...state,
        playlistId: playlistId.filter((elem) => elem !== action.payload)
      };
    case 'CLEAR_ALL_PLAYLIST_ID':
      return {
        ...state,
        playlistId: []
      };
    case 'CLOSE_LOADER':
      return {
        ...state,
        playloaderLoader: false
      };
    default:
      return {
        ...state
      };
  }
};
