export const defaultLikedState = {
  likedLoader: false,
  likedList: [],
  addedVideosId: []
};

export const likedReducerFunc = (state, action) => {
  switch (action.type) {
    case 'LIKE_API_REQUEST':
      return {
        ...state,
        likedLoader: true
      };
    case 'LIKE_API_RESPONSE':
      return {
        ...state,
        likedList: [...action.payload]
      };
    case 'UPDATE_ID':
      return {
        ...state,
        addedVideosId: [...action.payload]
      };
    case 'STOP_LIKE_LOADER':
      return {
        ...state,
        likedLoader: false
      };
    default:
      return {
        ...state
      };
  }
};
