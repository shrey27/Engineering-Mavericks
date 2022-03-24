export const defaultState = {
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

export const authReducerFunc = (state, action) => {
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
