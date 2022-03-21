import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { GETCATEGORIES, GETVIDEOS } from '../../routes';

const LandingContext = createContext();

const defaultState = {
  loading: false,
  search: '',
  filter: 'All',
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
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

const filterVideos = (filter, search, videoList) => {
  let tempList = [...videoList];

  if (search) {
    tempList = [
      ...tempList.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      )
    ];
  }
  if (filter) {
    tempList = [
      ...tempList.filter((e) =>
        filter === 'All' ? true : e.category === filter
      )
    ];
  }
  return tempList;
};

function LandingProvider({ children }) {
  const [state, dispatch] = useReducer(landingReducer, defaultState);
  const { filter, search, videoList } = state;

  const filteredList = filterVideos(filter, search, videoList);

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
