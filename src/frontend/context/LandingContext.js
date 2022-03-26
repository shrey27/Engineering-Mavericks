import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIDEOS } from '../routes/routes';
import { getCategories, getVideos } from '../service';
import { defaultLandingState, landingReducer } from '../helpers';

const LandingContext = createContext();

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
  const [state, dispatch] = useReducer(landingReducer, defaultLandingState);
  const { filter, search, videoList } = state;

  const filteredList = filterVideos(filter, videoList);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
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

export { useLandingCtx, LandingProvider };
