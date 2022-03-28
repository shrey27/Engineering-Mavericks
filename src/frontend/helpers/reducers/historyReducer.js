export const historyDefaultState = {
  historyLoader: false,
  watchedVideos: [],
  addedHistoryId: []
};
export const historyReducerFunction = (state, action) => {
  switch (action.type) {
    case 'HISTORY_API_REQUEST':
      return {
        ...state,
        historyLoader: true
      };
    case 'HISTORY_API_RESPONSE':
      return {
        ...state,
        watchedVideos: [...action.payload],
        historyLoader: false
      };
    case 'CLOSE_HISTORY_LOADER':
      return {
        ...state,
        historyLoader: false
      };
    case 'UPDATE_ID':
      return {
        ...state,
        addedHistoryId: [...action.payload]
      };
    default:
      return {
        ...state
      };
  }
};
