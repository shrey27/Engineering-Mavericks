export const defaultLandingState = {
  loading: false,
  search: '',
  filter: 'All',
  categoryList: [],
  videoList: [],
  more: true,
  data: [],
  after: 4
};

const perPage = 4;

export const landingReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CATEGORY':
      return {
        ...state,
        categoryList: [...action.payload]
      };
    case 'GET_VIDEOS':
      return {
        ...state,
        videoList: [...action.payload]
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
