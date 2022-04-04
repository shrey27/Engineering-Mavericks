import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIDEOS } from '../routes/routes';
import { getCategories, getVideos } from '../service';
import { defaultLandingState, landingReducer } from '../helpers';
import { ToastMessage } from '../components';

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
  const { filter, search, videoList, categoryList } = state;

  const filteredList = filterVideos(filter, videoList);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      dispatch({ type: 'SET_FILTER', payload: 'All' });
    }
    navigate({
      pathname: VIDEOS,
      search: `query=${search.trim()}`
    });
  };

  const getCategoriesList = async () => {
    const categories = await getCategories();
    dispatch({ type: 'GET_CATEGORY', payload: categories });
  };

  const getVideosList = async () => {
    const videos = await getVideos();
    dispatch({ type: 'GET_VIDEOS', payload: videos });
  };

  const addNewVideo = async (formObject) => {
    const { youtubeId, category, creator, title, description } = formObject;
    const categoryCaseChange =
      category[0].toUpperCase() + category.substring(1).toLowerCase();
    if (!categoryList.includes(categoryCaseChange)) {
      dispatch({ type: 'GET_CATEGORY', payload: [...categoryList, category] });
    }
    const videoObject = {
      _id: `v${videoList.length + 1}`,
      video: youtubeId,
      creator,
      title,
      category,
      description
    };
    dispatch({ type: 'GET_VIDEOS', payload: [...videoList, videoObject] });
    ToastMessage('Video uploaded successfully', 'success');
  };

  useEffect(() => {
    getCategoriesList();
    getVideosList();
  }, []);

  return (
    <LandingContext.Provider
      value={{ state, dispatch, handleSearchSubmit, filteredList, addNewVideo }}
    >
      {children}
    </LandingContext.Provider>
  );
}

const useLandingCtx = () => useContext(LandingContext);

export { useLandingCtx, LandingProvider };
