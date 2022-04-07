export const watchDefaultState = {
  watchloader: false,
  watchedLaterVideos: [],
  addedWatchLaterId: []
};
export const watchReducerFunction = (state, action) => {
  switch (action.type) {
    case 'WATCH_API_REQUEST':
      return {
        ...state,
        watchloader: true
      };
    case 'WATCH_API_RESPONSE':
      return {
        ...state,
        watchedLaterVideos: [...action.payload]
      };
    case 'WATCH_CLOSE_LOADER':
      return {
        ...state,
        watchloader: false
      };
    case 'UPDATE_WL_ID':
      return {
        ...state,
        addedWatchLaterId: [...action.payload]
      };
    default:
      return {
        ...state
      };
  }
};
