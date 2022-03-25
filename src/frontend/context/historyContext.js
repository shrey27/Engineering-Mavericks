import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuthCtx } from './index';
import {
  getHistoryVideos,
  addToHistory,
  deleteFromHistory,
  clearHistory
} from '../service';
import { useLocalStorage } from '../helpers';

const HistoryContext = createContext();
const historyDefaultState = {
  loading: false,
  watchedVideos: [],
  addedHistoryId: []
};
const historyReducerFunction = (state, action) => {
  switch (action.type) {
    case 'HISTORY_API_REQUEST':
      return {
        ...state,
        historyLoader: true
      };
    case 'HISTORY_API_RESPONSE':
      return {
        ...state,
        watchedVideos: [...action.payload],
        historyLoader: false
      };
    case 'UPDATE_ID':
      return {
        ...state,
        addedHistoryId: [...action.payload]
      };
    default:
      return {
        ...state
      };
  }
};

const HistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    historyReducerFunction,
    historyDefaultState
  );
  const { token } = useAuthCtx();
  const { updateLocalStorage } = useLocalStorage();

  const clearHistoryList = async () => {
    dispatch({ type: 'HISTORY_API_REQUEST' });
    const history = await clearHistory(token);
    updateLocalStorage('history', history);
  };

  const deleteFromHistoryList = async (id) => {
    dispatch({ type: 'HISTORY_API_REQUEST' });
    const history = await deleteFromHistory(id, token);
    updateLocalStorage('history', history);
    dispatch({ type: 'HISTORY_API_RESPONSE', payload: [...history] });
  };

  const addToHistorylist = async (video) => {
    dispatch({ type: 'HISTORY_API_REQUEST' });
    const { addedHistoryId } = state;

    if (!addedHistoryId.includes(video._id)) {
      const history = await addToHistory(video, token);
      console.log('history', history);
      updateLocalStorage('history', history);
      dispatch({ type: 'HISTORY_API_RESPONSE', payload: [...history] });

      const idArray = history.map((elem) => elem._id);
      dispatch({ type: 'UPDATE_ID', payload: [...idArray] });
    }
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
