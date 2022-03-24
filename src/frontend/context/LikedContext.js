import { createContext, useContext, useReducer, useEffect } from 'react';

const LikedContext = createContext();

const LikedProvider = ({ children }) => {
  return <LikedContext.Provider>{children}</LikedContext.Provider>;
};

const useLikedCtx = () => useContext(LikedContext);

export { useLikedCtx, LikedProvider };
