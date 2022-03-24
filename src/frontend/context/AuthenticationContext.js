import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LANDING } from '../routes/routes';
import { signUpApi, signInApi } from '../service';
import { validationForSignIn, validationForSignUp } from '../helpers';
import { useLocalStorage } from '../helpers/localStorage';

const AuthenticationContext = createContext();

const defaultState = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  cnfPassword: '',
  cnfpasswordError: '',
  username: '',
  userNameError: '',
  signinError: '',
  signupError: '',
  rememberMe: false,
  signinRememberMe: false,
  userdata: '',
  token: null
};

const authReducerFunc = (state, action) => {
  switch (action.type) {
    case 'SIGNIN-EMAIL':
      return {
        ...state,
        email: action.payload
      };
    case 'SIGNIN-PASSWORD':
      return {
        ...state,
        password: action.payload
      };
    case 'SIGNUP-USERNAME':
      return {
        ...state,
        username: action.payload
      };
    case 'TOKEN-SAVED':
      return {
        ...state,
        userdata: 'TOKENSAVED',
        token: action.payload,
        signupError: ''
      };
    case 'TOKEN-REMOVED':
      return {
        ...state,
        userdata: '',
        token: ''
      };
    case 'SIGNIN-ERROR':
      return {
        ...state,
        signinError: action.payload
      };
    case 'SIGNUP-ERROR':
      return {
        ...state,
        signupError: 'SIGN UP FAILED! TRY AFTER SOME TIME'
      };
    case 'PASSWORDS-MISMATCH':
      return {
        ...state,
        signupError: "Passwords Don't Match"
      };
    case 'CONFIRM-PASSWORD':
      return {
        ...state,
        cnfPassword: action.payload
      };
    case 'EMAIL-INCORRECT':
      return {
        ...state,
        emailError: 'Enter the email in correct format'
      };
    case 'PASSWORD-INCORRECT':
      return {
        ...state,
        passwordError: 'Password should be atleast 8 chars long'
      };
    case 'CONFIRM-PASSWORD-INCORRECT':
      return {
        ...state,
        cnfpasswordError: 'Password should be atleast 8 chars long'
      };
    case 'SIGNUP-USERNAME-ERROR':
      return {
        ...state,
        userNameError: 'Username can only have alphabets'
      };
    case 'CLEAR-ALL-ERRORS':
      return {
        ...state,
        cnfpasswordError: '',
        passwordError: '',
        emailError: '',
        signupError: '',
        signinError: '',
        userNameError: ''
      };
    case 'REMEMBER-ME':
      return {
        ...state,
        rememberMe: !state.rememberMe
      };
    case 'SIGNIN-REMEMBER-ME':
      return {
        ...state,
        signinRememberMe: !state.signinRememberMe
      };
    case 'CLEAR-FIELDS':
      return {
        ...defaultState
      };
    default:
      return {
        ...state
      };
  }
};

const AuthenticationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducerFunc, defaultState);
  const {
    email,
    password,
    cnfPassword,
    rememberMe,
    signinRememberMe,
    signinError,
    signupError,
    userdata,
    token,
    emailError,
    passwordError,
    cnfpasswordError,
    username,
    userNameError
  } = state;
  const navigate = useNavigate();
  const storedData = useLocalStorage();

  const handleSignIn = async () => {
    if (validationForSignIn(state, dispatch)) {
      if (!rememberMe) {
        try {
          const response = await signInApi(email, password);
          if (response.data) {
            const { foundUser, encodedToken } = response.data;
            localStorage.setItem('token', encodedToken);
            localStorage.setItem('userData', JSON.stringify(foundUser));
            dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
            navigate(LANDING);
          } else {
            throw new Error('User not Found');
          }
        } catch (err) {
          dispatch({
            type: 'SIGNIN-ERROR',
            payload: 'User Not Found. Either Sign-up or try again later'
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
      } else {
        dispatch({ type: 'SIGNUP-ERROR' });
      }
      dispatch({ type: 'SET-DEFAULT' });
      navigate(LANDING);
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
        email,
        password,
        userdata,
        cnfPassword,
        rememberMe,
        signinRememberMe,
        token,
        signinError,
        signupError,
        dispatch,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        emailError,
        passwordError,
        cnfpasswordError,
        username,
        userNameError
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuthCtx = () => useContext(AuthenticationContext);

export { useAuthCtx, AuthenticationProvider };
