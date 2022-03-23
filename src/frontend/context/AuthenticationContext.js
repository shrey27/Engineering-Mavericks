import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LANDING, SIGN_UP, SIGN_IN } from '../routes/routes';
import axios from 'axios';

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

// function LocalStore() {
//   const [local, setLocal] = useState(false);
//   return { local };
// }

export function callLocalStorage() {
  const { email, password, cart, wishlist } = JSON.parse(
    localStorage.getItem('userData')
  );
  const storedToken = localStorage.getItem('token');
  return {
    storedEmail: email,
    storedPassword: password,
    storedCart: cart,
    storedWishlist: wishlist,
    storedToken
  };
}

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

  function validationForSignIn() {
    if (
      !email ||
      !email.match(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
    ) {
      dispatch({ type: 'EMAIL-INCORRECT' });
      return false;
    }
    if (!password || password.length < 8) {
      dispatch({ type: 'PASSWORD-INCORRECT' });
      return false;
    }
    return true;
  }

  function validationForSignUp() {
    if (!username || !username.match(/^[a-zA-Z ]+/)) {
      dispatch({ type: 'SIGNUP-USERNAME-ERROR' });
      return false;
    }

    if (
      !email ||
      !email.match(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
    ) {
      dispatch({ type: 'EMAIL-INCORRECT' });
      return false;
    }

    if (!password || password.length < 8) {
      dispatch({ type: 'PASSWORD-INCORRECT' });
      return false;
    }

    if (!cnfPassword || cnfPassword.length < 8) {
      dispatch({ type: 'CONFIRM-PASSWORD-INCORRECT' });
      return false;
    }

    if (cnfPassword !== password) {
      dispatch({ type: 'PASSWORDS-MISMATCH' });
      return false;
    }

    return true;
  }

  const handleSignIn = async () => {
    if (validationForSignIn()) {
      if (!rememberMe) {
        try {
          const {
            data: { foundUser, encodedToken }
          } = await axios.post(SIGN_IN, {
            email,
            password
          });
          if (foundUser) {
            localStorage.setItem('token', encodedToken);
            localStorage.setItem('userData', JSON.stringify(foundUser));
            dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
            navigate(LANDING);
          } else {
            throw new Error('User not Found');
          }
        } catch (err) {
          console.log('SIGNIN-ERROR', err);
          dispatch({
            type: 'SIGNIN-ERROR',
            payload: 'User Not Found. Either Sign-up or try again later'
          });
        }
      } else {
        const { storedEmail, storedPassword, storedToken } = callLocalStorage();
        if (storedEmail === email && storedPassword === password) {
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
    if (validationForSignUp()) {
      try {
        const response = await axios.post(SIGN_UP, {
          name: username.split(' ')[0],
          surname: username.split(' ')[1],
          email,
          password
        });
        const { createdUser, encodedToken } = response.data;
        localStorage.setItem('token', encodedToken);
        localStorage.setItem('userData', JSON.stringify(createdUser));
        dispatch({ type: 'TOKEN-SAVED', payload: encodedToken });
      } catch (err) {
        dispatch({ type: 'SIGNUP-ERROR' });
        console.log(err);
      } finally {
        dispatch({ type: 'SET-DEFAULT' });
        navigate(LANDING);
      }
    }
  };

  const handleSignOut = () => {
    dispatch({ type: 'TOKEN-REMOVED' });
    dispatch({ type: 'CLEAR-FIELDS' });
    if (!rememberMe && !signinRememberMe) localStorage.clear();
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
