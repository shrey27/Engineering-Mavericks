import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuthCtx, useLandingCtx } from './index';
import {
  getHistoryVideos,
  addToHistory,
  deleteFromHistory,
  clearHistory
} from '../service';
import { ToastMessage } from '../components';
import {
  historyReducerFunction,
  historyDefaultState,
  useLocalStorage
} from '../helpers';

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    historyReducerFunction,
    historyDefaultState
  );
  const { token } = useAuthCtx();
  const { updateLocalStorage } = useLocalStorage();
  const { dispatch: landingDispatch } = useLandingCtx();

  const clearHistoryList = async () => {
    dispatch({ type: 'HISTORY_API_REQUEST' });
    const history = await clearHistory(token);
    updateLocalStorage('history', history);
    dispatch({ type: 'HISTORY_API_RESPONSE', payload: [...history] });
    dispatch({ type: 'UPDATE_ID', payload: [] });
    ToastMessage('Your history was cleared', 'info');
  };

  const deleteFromHistoryList = async (id) => {
    dispatch({ type: 'HISTORY_API_REQUEST' });
    const history = await deleteFromHistory(id, token);
    updateLocalStorage('history', history);
    dispatch({ type: 'HISTORY_API_RESPONSE', payload: [...history] });

    dispatch({
      type: 'UPDATE_ID',
      payload: state.addedHistoryId.filter((e) => e !== id)
    });
    ToastMessage('Video removed from history', 'error');
  };

  const addToHistorylist = async (video) => {
    dispatch({ type: 'HISTORY_API_REQUEST' });
    const { addedHistoryId } = state;

    if (!addedHistoryId.includes(video._id)) {
      const history = await addToHistory(video, token);
      updateLocalStorage('history', history);
      dispatch({ type: 'HISTORY_API_RESPONSE', payload: [...history] });

      const idArray = history.map((elem) => elem._id);
      dispatch({ type: 'UPDATE_ID', payload: [...idArray] });
    } else {
      dispatch({ type: 'CLOSE_HISTORY_LOADER' });
    }
    landingDispatch({
      type: 'UPDATE_VIEWCOUNT',
      payload: { videoId: video._id }
    });
  };

  useEffect(() => {
    const getHistoryList = async () => {
      dispatch({ type: 'HISTORY_API_REQUEST' });

      const history = await getHistoryVideos(token);
      dispatch({ type: 'HISTORY_API_RESPONSE', payload: [...history] });

      const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
      datatoUpdate.history = [...history];
      localStorage.setItem('userData', JSON.stringify(datatoUpdate));
    };
    if (token) getHistoryList();
  }, [token]);

  return (
    <HistoryContext.Provider
      value={{
        state,
        dispatch,
        addToHistorylist,
        deleteFromHistoryList,
        clearHistoryList
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

const useHistoryCtx = () => useContext(HistoryContext);

export { useHistoryCtx, HistoryProvider };
