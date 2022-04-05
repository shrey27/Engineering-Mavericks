import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIDEOS } from '../routes/routes';
import { getCategories, getVideos } from '../service';
import { defaultLandingState, landingReducer } from '../helpers';
import { ToastMessage } from '../components';

const LandingContext = createContext();

const perPage = 4;

const filterVideos = (filter, videoList) => {
  let tempList = videoList;
  if (filter) {
    tempList = tempList?.filter((e) =>
      filter === 'All' ? true : e.category === filter
    );
  }
  return tempList;
};

function LandingProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(landingReducer, defaultLandingState);
  const { filter, search, videoList, categoryList, after } = state;

  const load = () => {
    dispatch({ type: 'SET_LOADING' });

    setTimeout(() => {
      const newData = videoList?.slice(after, after + perPage);
      dispatch({ type: 'RESET_LOADING', newData });
    }, 300);
  };

  const filterList = (list) => {
    return filterVideos(filter, list);
  };

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
    dispatch({ type: 'SET_DATA', payload: [videoObject] });
    ToastMessage('Video uploaded successfully', 'success');
  };

  const updateCommentsOnVideo = (videoId, comment) => {
    const video = videoList.find((item) => item._id === videoId);
    if (video.comments.includes(comment)) {
      video.comments = video.comments.filter((elem) => elem !== comment);
    } else {
      video.comments.push(comment);
    }
  };

  const getComments = (videoId) => {
    const video = videoList.find((item) => item._id === videoId);
    return video.comments;
  };

  useEffect(() => {
    const getVideosList = async () => {
      const videos = await getVideos();
      dispatch({ type: 'GET_VIDEOS', payload: videos });
      const newData = videos?.slice(0, 4);
      dispatch({ type: 'SET_DATA', payload: newData });
    };
    getCategoriesList();
    getVideosList();
  }, []);

  return (
    <LandingContext.Provider
      value={{
        state,
        dispatch,
        handleSearchSubmit,
        filterList,
        addNewVideo,
        updateCommentsOnVideo,
        getComments,
        load
      }}
    >
      {children}
    </LandingContext.Provider>
  );
}

const useLandingCtx = () => useContext(LandingContext);

export { useLandingCtx, LandingProvider };
