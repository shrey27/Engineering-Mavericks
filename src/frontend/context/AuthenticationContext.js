import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LANDING } from '../routes/routes';
import { signUpApi, signInApi } from '../service';
import {
  useLocalStorage,
  defaultState,
  authReducerFunc,
  validationForSignIn,
  validationForSignUp
} from '../helpers';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducerFunc, defaultState);
  const { email, password, rememberMe, signinRememberMe, username } = state;
  const navigate = useNavigate();
  const storedData = useLocalStorage();

  const handleSignIn = async () => {
    if (validationForSignIn(state, dispatch)) {
      if (!rememberMe) {
        const response = await signInApi(email, password);
        if (response.data) {
          const { foundUser, encodedToken } = response.data;
          localStorage.setItem('token', encodedToken);
          localStorage.setItem('userData', JSON.stringify(foundUser));
          dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
          navigate(LANDING);
        } else {
          dispatch({
            type: 'SIGNIN-ERROR',
            payload: response.error
          });
        }
      } else {
        const { storedEmail, storedPassword, storedToken } = storedData;
        if (
          !storedData ||
          (storedEmail === email && storedPassword === password)
        ) {
          dispatch({ type: 'TOKEN-SAVED', payload: storedToken });
          dispatch({ type: 'SET-DEFAULT' });
          navigate(LANDING);
        } else {
          dispatch({
            type: 'SIGNIN-ERROR',
            payload: 'User Not Found. Either Sign-up or try again later'
          });
          dispatch({ type: 'SET-DEFAULT' });
        }
      }
    }
  };

  const handleSignUp = async () => {
    if (validationForSignUp(state, dispatch)) {
      const response = await signUpApi(username, email, password);
      if (response.data) {
        const { createdUser, encodedToken } = response.data;
        localStorage.setItem('token', encodedToken);
        localStorage.setItem('userData', JSON.stringify(createdUser));
        dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
        navigate(LANDING);
      } else {
        // dispatch({ type: 'SET-DEFAULT' });
        dispatch({ type: 'CLEAR-FIELDS' });
        dispatch({ type: 'SIGNUP-ERROR', payload: response.error });
      }
    }
  };

  const handleSignOut = () => {
    dispatch({ type: 'TOKEN-REMOVED' });
    if (!rememberMe && !signinRememberMe) {
      dispatch({ type: 'CLEAR-FIELDS' });
      localStorage.clear();
    }
    navigate(LANDING);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      dispatch({ type: 'TOKEN-SAVED', payload: localStorage.getItem('token') });
    }
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        ...state,
        dispatch,
        handleSignIn,
        handleSignUp,
        handleSignOut
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuthCtx = () => useContext(AuthenticationContext);

export { useAuthCtx, AuthenticationProvider };
