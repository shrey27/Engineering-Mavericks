import axios from 'axios';
import { createContext, useContext, useReducer } from 'react';
import { GETLIKED } from '../routes/routes';
import { useAuthCtx } from './AuthenticationContext';

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
    default:
      return {
        ...state
      };
  }
};

const LikedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likedReducerFunc, defaultLikedState);
  const { token } = useAuthCtx();

  // const getLikedList = async () => {
  //   dispatch({ type: 'LIKE_API_REQUEST' });
  //   try {
  //     const {
  //       data: { likes }
  //     } = await axios.get(GETLIKED);

  //     const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
  //     datatoUpdate.likes = [...likes];
  //     localStorage.setItem('userData', JSON.stringify(datatoUpdate));

  //     dispatch({ type: 'LIKE_API_RESPONSE', payload: [...likes] });

  //     console.log('get liked array', likes);
  //   } catch (err) {
  //     console.log('LIKED_GET_REQUEST_ERROR', err);
  //   }
  // };

  const deleteLikedVideo = async (id, video) => {
    dispatch({ type: 'LIKE_API_REQUEST' });
    try {
      const {
        data: { likes }
      } = await axios.delete(`${GETLIKED}/${id}`, {
        headers: {
          authorization: token
        }
      });

      const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
      datatoUpdate.likes = [...likes];
      localStorage.setItem('userData', JSON.stringify(datatoUpdate));

      dispatch({ type: 'LIKE_API_RESPONSE', payload: [...likes] });

      console.log('delete liked array', likes);
    } catch (err) {
      console.log('LIKED_DELETE_REQUEST_ERROR', err);
    }
  };

  const addToLikedlist = async (video) => {
    dispatch({ type: 'LIKE_API_REQUEST' });
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
      const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
      datatoUpdate.likes = [...likes];
      localStorage.setItem('userData', JSON.stringify(datatoUpdate));

      dispatch({ type: 'LIKE_API_RESPONSE', payload: [...likes] });

      console.log('post liked array', likes);
    } catch (err) {
      console.log('LIKED_POST_REQUEST_ERROR', err);
    }
  };

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
