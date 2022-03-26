export const playlistDefaultState = {
  playloaderLoader: false,
  playlists: [],
  videoId: '',
  playlistId: ''
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
        playlistId: action.payload
      };
    case 'REMOVE_PLAYLIST_ID':
      return {
        ...state,
        playlistId: ''
      };
    default:
      return {
        ...state
      };
  }
};
