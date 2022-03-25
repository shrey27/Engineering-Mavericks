import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuthCtx } from './AuthenticationContext';
import { addLikedVideo, deleteLikedVideo, getLikedVideos } from '../service';
import {
  likedReducerFunc,
  defaultLikedState,
  useLocalStorage
} from '../helpers';

const LikedContext = createContext();

const LikedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likedReducerFunc, defaultLikedState);
  const { token } = useAuthCtx();
  const { updateLocalStorage } = useLocalStorage();

  const deleteLikedFromList = async (id) => {
    dispatch({ type: 'LIKE_API_REQUEST' });
    const { addedVideosId } = state;

    const likes = await deleteLikedVideo(id, token);

    updateLocalStorage('likes', likes);

    dispatch({ type: 'LIKE_API_RESPONSE', payload: [...likes] });
    dispatch({
      type: 'UPDATE_ID',
      payload: addedVideosId.filter((e) => e !== id)
    });
  };

  const addToLikedlist = async (video) => {
    dispatch({ type: 'LIKE_API_REQUEST' });
    const { addedVideosId } = state;

    if (addedVideosId.includes(video._id)) {
      deleteLikedFromList(video._id);
    } else {
      const likes = await addLikedVideo(video, token);

      updateLocalStorage('likes', likes);

      dispatch({ type: 'LIKE_API_RESPONSE', payload: [...likes] });
      const idArray = likes.map((elem) => elem._id);
      dispatch({ type: 'UPDATE_ID', payload: [...idArray] });
    }
  };

  useEffect(() => {
    const getLikedList = async () => {
      dispatch({ type: 'LIKE_API_REQUEST' });

      const likes = await getLikedVideos(token);
      dispatch({ type: 'LIKE_API_RESPONSE', payload: [...likes] });

      const idArray = likes.map((elem) => elem._id);
      dispatch({ type: 'UPDATE_ID', payload: [...idArray] });

      const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
      datatoUpdate.likes = [...likes];
      localStorage.setItem('userData', JSON.stringify(datatoUpdate));
    };
    if (token) getLikedList();
  }, [token]);

  return (
    <LikedContext.Provider
      value={{ state, dispatch, addToLikedlist, deleteLikedFromList }}
    >
      {children}
    </LikedContext.Provider>
  );
};

const useLikedCtx = () => useContext(LikedContext);

export { useLikedCtx, LikedProvider };
