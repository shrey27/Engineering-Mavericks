import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIDEOS } from '../routes/routes';
import { getCategories, getVideos } from '../service';
import { defaultLandingState, landingReducer } from '../helpers';
import { ToastMessage } from '../components';
import { v4 as uuid } from 'uuid';

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

function getId(url) {
  let regex =
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
  return regex.exec(url)[3];
}

function LandingProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(landingReducer, defaultLandingState);
  const { filter, search, videoList, savedFilterList, after, more } = state;

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
    const { url, category, creator, title, description } = formObject;
    if (
      !savedFilterList.some(
        (item) => item.toLowerCase() === category.toLowerCase()
      )
    ) {
      dispatch({
        type: 'ADD_FILTER',
        payload: category
      });
    }
    const videoObject = {
      _id: uuid(),
      video: getId(url),
      creator,
      title,
      category,
      description,
      videoDate: new Date(),
      viewCount: 0,
      comments: []
    };
    dispatch({ type: 'GET_VIDEOS', payload: [...videoList, videoObject] });

    if (!more) {
      dispatch({ type: 'SET_DATA', payload: [videoObject] });
    }
    ToastMessage('Video added to the end of the list', 'success');
  };

  const updateCommentsOnVideo = (videoId, commentId, newComment, toEdit) => {
    let commentToUpdate = videoList.find(
      (item) => item._id === videoId
    ).comments;
    if (commentId.trim().length) {
      if (toEdit) {
        commentToUpdate = commentToUpdate.reduce(
          (acc, curr) =>
            curr._id === commentId
              ? [...acc, { ...curr, comment: newComment }]
              : [...acc, curr],
          []
        );
      } else {
        commentToUpdate = commentToUpdate.filter(
          (elem) => elem._id !== commentId
        );
      }
    } else {
      commentToUpdate = commentToUpdate.concat({
        _id: uuid(),
        comment: newComment
      });
    }

    dispatch({
      type: 'UPDATE_COMMENTS',
      payload: { videoId, comments: commentToUpdate }
    });
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
