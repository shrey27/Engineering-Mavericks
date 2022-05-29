export const defaultLandingState = {
  loading: false,
  search: '',
  filter: 'All',
  categoryList: [],
  savedFilterList: [
    'All',
    'Electrical',
    'Automobiles',
    'Space',
    'Stuff',
    'Science',
    'Physics',
    'Communication',
    'Scientists'
  ],
  videoList: [],
  newVideo: null,
  more: true,
  data: [],
  after: 4
};

const perPage = 4;

export const landingReducer = (state, action) => {
  const templist = state.data;

  switch (action.type) {
    case 'GET_CATEGORY':
      return {
        ...state,
        categoryList: [...action.payload]
      };
    case 'GET_VIDEOS':
      return {
        ...state,
        videoList: action.payload
      };
    case 'NEW_VIDEO':
      return {
        ...state,
        newVideo: action.payload
      };
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload
      };
    case 'SEARCH_CLEAR':
      return {
        ...state,
        search: ''
      };
    case 'ADD_FILTER':
      return {
        ...state,
        savedFilterList: [...state.savedFilterList, action.payload]
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'SET_DATA':
      return {
        ...state,
        data: [...state.data, ...action.payload]
      };
    case 'UPDATE_VIEWCOUNT':
      let { videoId } = action?.payload;
      let videoIndex = templist.findIndex((item) => item._id === videoId);
      templist[videoIndex].viewCount++;
      return {
        ...state,
        data: [...templist]
      };
    case 'UPDATE_COMMENTS':
      let { videoId: videoToUpdateId, comments: updatedComments } =
        action?.payload;
      let videoToUpdateIndex = templist.findIndex(
        (item) => item._id === videoToUpdateId
      );
      templist[videoToUpdateIndex].comments = [...updatedComments];
      return {
        ...state,
        data: [...templist]
      };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'RESET_LOADING':
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.newData],
        more: action.newData.length === perPage,
        after: state.after + action.newData.length
      };
    default:
      return {
        ...state
      };
  }
};
