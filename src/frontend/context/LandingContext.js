import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIDEOS } from '../routes/routes';
import { getCategories, getVideos } from '../service';
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

const filterVideos = (filter, videoList) => {
  let tempList = [...videoList];
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
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(landingReducer, defaultState);
  const { filter, search, videoList } = state;

  const filteredList = filterVideos(filter, videoList);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('search', search);
    if (search.trim().length > 0) {
      dispatch({ type: 'SET_FILTER', payload: 'All' });
      navigate({
        pathname: VIDEOS,
        search: `query=${search.trim()}`
      });
    }
  };

  const getCategoriesList = async () => {
    const categories = await getCategories();
    dispatch({ type: 'GET_CATEGORY', payload: categories });
  };

  const getVideosList = async () => {
    const videos = await getVideos();
    dispatch({ type: 'GET_VIDEOS', payload: videos });
  };

  useEffect(() => {
    getCategoriesList();
    getVideosList();
  }, []);

  return (
    <LandingContext.Provider
      value={{ state, dispatch, handleSearchSubmit, filteredList }}
    >
      {children}
    </LandingContext.Provider>
  );
}

const useLandingCtx = () => useContext(LandingContext);

const useSingleVideo = (id) => {
  const { filteredList } = useLandingCtx();
  return filteredList.find((elem) => elem.vid === id);
};

export { useLandingCtx, useSingleVideo, LandingProvider };
