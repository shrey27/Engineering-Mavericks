import { createContext, useContext, useReducer } from 'react';
// import { useAuthCtx } from './index';

const HistoryContext = createContext();
const historyDefaultState = {
  loading: false,
  watchedVideos: []
};
const historyReducerFunction = (state, action) => {
  switch (action.type) {
  }
};

const HistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    historyReducerFunction,
    historyDefaultState
  );
  // const { token } = useAuthCtx();

  return (
    <HistoryContext.Provider value={{ state, dispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};

const useHistoryCtx = () => useContext(HistoryContext);

export { useHistoryCtx, HistoryProvider };
