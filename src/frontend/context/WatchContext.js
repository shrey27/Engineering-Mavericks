import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuthCtx } from './index';
import {
  getWatchLaterVideos,
  addToWatchLater,
  deleteFromWatchLater,
  clearWatchLater
} from '../service';
import {
  watchReducerFunction,
  watchDefaultState,
  useLocalStorage
} from '../helpers';

const WatchContext = createContext();

const WatchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(watchReducerFunction, watchDefaultState);
  const { token } = useAuthCtx();
  const { updateLocalStorage } = useLocalStorage();

  const clearWatchLaterList = async () => {
    dispatch({ type: 'WATCH_API_REQUEST' });
    const watchlater = await clearWatchLater(token);
    updateLocalStorage('watchlater', watchlater);
    dispatch({ type: 'WATCH_API_RESPONSE', payload: [...watchlater] });
  };

  const deleteFromWatchLaterList = async (id) => {
    dispatch({ type: 'WATCH_API_REQUEST' });
    const watchlater = await deleteFromWatchLater(id, token);
    updateLocalStorage('watchlater', watchlater);
    dispatch({ type: 'WATCH_API_RESPONSE', payload: [...watchlater] });
  };

  const addToWatchlist = async (video) => {
    dispatch({ type: 'WATCH_API_REQUEST' });
    const { addedWatchLaterId } = state;

    if (!addedWatchLaterId.includes(video._id)) {
      const watchlater = await addToWatchLater(video, token);

      updateLocalStorage('watchlater', watchlater);
      dispatch({ type: 'WATCH_API_RESPONSE', payload: [...watchlater] });

      const idArray = watchlater.map((elem) => elem._id);
      dispatch({ type: 'UPDATE_WL_ID', payload: [...idArray] });
    }
  };

  useEffect(() => {
    const getHistoryList = async () => {
      dispatch({ type: 'WATCH_API_REQUEST' });

      const history = await getWatchLaterVideos(token);
      dispatch({ type: 'WATCH_API_RESPONSE', payload: [...history] });

      const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
      datatoUpdate.history = [...history];
      localStorage.setItem('userData', JSON.stringify(datatoUpdate));
    };
    if (token) getHistoryList();
  }, [token]);

  return (
    <WatchContext.Provider
      value={{
        state,
        dispatch,
        addToWatchlist,
        clearWatchLaterList,
        deleteFromWatchLaterList
      }}
    >
      {children}
    </WatchContext.Provider>
  );
};

const useWatchCtx = () => useContext(WatchContext);

export { useWatchCtx, WatchProvider };
