import axios from 'axios';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { GETLIKED } from '../routes/routes';
import { useAuthCtx } from '../context';
import { ToastMessage } from '../components';

const LikedContext = createContext();

const defaultLikedState = {
  likedLoader: false,
  likedList: [],
  addedVideosId: []
};

const likedReducerFunc = (state, action) => {
  switch (action.type) {
    case 'LIKE_API_REQUEST':
      return {
        ...state,
        likedLoader: true
      };
    case 'LIKE_API_RESPONSE':
      return {
        ...state,
        likedList: [...action.payload],
        likedLoader: false
      };
    case 'UPDATE_ID':
      return {
        ...state,
        addedVideosId: [...action.payload]
      };
    default:
      return {
        ...state
      };
  }
};

const LikedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likedReducerFunc, defaultLikedState);
  const { token } = useAuthCtx();

  const getLikedList = async () => {
    dispatch({ type: 'LIKE_API_REQUEST' });
    try {
      const storedLikes = JSON.parse(localStorage.getItem('userData'))?.likes;
      if (storedLikes) {
        dispatch({ type: 'LIKE_API_RESPONSE', payload: storedLikes });

        const idArray = storedLikes.map((elem) => elem._id);
        dispatch({ type: 'UPDATE_ID', payload: [...idArray] });
      } else {
        const {
          data: { likes }
        } = await axios.get(GETLIKED);
        dispatch({ type: 'LIKE_API_RESPONSE', payload: [...likes] });

        const idArray = likes.map((elem) => elem._id);
        dispatch({ type: 'UPDATE_ID', payload: [...idArray] });

        const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
        datatoUpdate.likes = [...likes];
        localStorage.setItem('userData', JSON.stringify(datatoUpdate));
      }
    } catch (err) {
      console.log('LIKED_GET_REQUEST_ERROR', err);
    }
  };

  const deleteLikedVideo = async (id, video) => {
    dispatch({ type: 'LIKE_API_REQUEST' });
    const { addedVideosId } = state;
    try {
      const {
        data: { likes }
      } = await axios.delete(`${GETLIKED}/${id}`, {
        headers: {
          authorization: token
        }
      });
      ToastMessage('Deleted from Liked Videos', 'info');

      const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
      datatoUpdate.likes = [...likes];
      localStorage.setItem('userData', JSON.stringify(datatoUpdate));
      dispatch({ type: 'LIKE_API_RESPONSE', payload: [...likes] });
      dispatch({
        type: 'UPDATE_ID',
        payload: addedVideosId.filter((e) => e !== id)
      });
      
    } catch (err) {
      console.log('LIKED_DELETE_REQUEST_ERROR', err);
      ToastMessage('Cannot Perform this Action right now', 'error');
    }
  };

  const addToLikedlist = async (video) => {
    dispatch({ type: 'LIKE_API_REQUEST' });

    const { addedVideosId } = state;

    if (addedVideosId.includes(video._id)) {
      deleteLikedVideo(video._id, video);
    } else {
      try {
        const {
          data: { likes }
        } = await axios.post(
          GETLIKED,
          { video },
          {
            headers: {
              authorization: token
            }
          }
        );
        ToastMessage('Added to Liked Videos', 'success');

        const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
        datatoUpdate.likes = [...likes];
        localStorage.setItem('userData', JSON.stringify(datatoUpdate));
        dispatch({ type: 'LIKE_API_RESPONSE', payload: [...likes] });
        const idArray = likes.map((elem) => elem._id);
        dispatch({ type: 'UPDATE_ID', payload: [...idArray] });
        
      } catch (err) {
        console.log('LIKED_POST_REQUEST_ERROR', err);
        ToastMessage('Cannot Perform this Action right now', 'error');
      }
    }
  };

  useEffect(() => {
    getLikedList();
  }, []);

  return (
    <LikedContext.Provider
      value={{ state, dispatch, addToLikedlist, deleteLikedVideo }}
    >
      {children}
    </LikedContext.Provider>
  );
};

const useLikedCtx = () => useContext(LikedContext);

export { useLikedCtx, LikedProvider };
