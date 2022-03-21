import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { GETCATEGORIES, GETVIDEOS } from '../../routes';

const LandingContext = createContext();

const defaultState = {
  loading: false,
  search: '',
  categoryList: [],
  videoList: []
};

const landingReducer = (state, action) => {
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
    default:
      return {
        ...state
      };
  }
};

const filterVideosbySearch = (search, videoList) => {
  if (search) {
    return videoList.filter((e) => e.category === search);
  }
  return videoList;
};
function LandingProvider({ children }) {
  const [state, dispatch] = useReducer(landingReducer, defaultState);
  const { search, videoList } = state;

  const filteredList = filterVideosbySearch(search, videoList);

  const getCategories = async () => {
    try {
      const {
        data: { categories }
      } = await axios.get(GETCATEGORIES);
      dispatch({ type: 'GET_CATEGORY', payload: categories });
    } catch (err) {
      console.log('Landing Error', err);
    }
  };

  const getVideos = async () => {
    try {
      const {
        data: { videos }
      } = await axios.get(GETVIDEOS);
      dispatch({ type: 'GET_VIDEOS', payload: videos });
    } catch (err) {
      console.log('Videos Error', err);
    }
  };

  useEffect(() => {
    getCategories();
    getVideos();
  }, []);

  return (
    <LandingContext.Provider value={{ state, dispatch, filteredList }}>
      {children}
    </LandingContext.Provider>
  );
}

const useLandingCtx = () => useContext(LandingContext);

export { useLandingCtx, LandingProvider };
