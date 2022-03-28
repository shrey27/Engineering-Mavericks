/*
 rememberMe : to ensure that user details are picked automatically in sign in , in same browser

 signinRememberMe: to ensure that if user sign in's in new broweser/pc since his details won;t be found
 in local storage, he has to sign in by typing email and password anf then choose remeber me option on 
 sign in page, so that his details are saved in that browser, for next time sign in.
 
 CLEAR-FIELDS: will set all the input fields back to default state
 */
export const defaultState = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  signupEmail: '',
  signupEmailError: '',
  signupPassword: '',
  signupPasswordError: '',
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
    case 'EMAIL-INCORRECT':
      return {
        ...state,
        emailError: 'Enter the email in correct format'
      };
    case 'SIGNIN-PASSWORD':
      return {
        ...state,
        password: action.payload
      };
    case 'PASSWORD-INCORRECT':
      return {
        ...state,
        passwordError: 'Password should be atleast 8 chars long'
      };
    case 'SIGNUP-EMAIL':
      return {
        ...state,
        signupEmail: action.payload
      };
    case 'SIGNUP-EMAIL-INCORRECT':
      return {
        ...state,
        signupEmailError: 'Enter the email in correct format'
      };
    case 'SIGNUP-PASSWORD':
      return {
        ...state,
        signupPassword: action.payload
      };
    case 'SIGNUP-PASSWORD-INCORRECT':
      return {
        ...state,
        signupPasswordError: 'Password should be atleast 8 chars long'
      };
    case 'SIGNUP-USERNAME':
      return {
        ...state,
        username: action.payload
      };
    case 'SIGNUP-USERNAME-ERROR':
      return {
        ...state,
        userNameError: 'Username can only have alphabets'
      };
    case 'CONFIRM-PASSWORD':
      return {
        ...state,
        cnfPassword: action.payload
      };
    case 'CONFIRM-PASSWORD-INCORRECT':
      return {
        ...state,
        cnfpasswordError: 'Password should be atleast 8 chars long'
      };
    case 'SIGNIN-ERROR':
      return {
        ...state,
        signinError: action.payload
      };
    case 'SIGNUP-ERROR':
      return {
        ...state,
        signupError: action.payload
      };
    case 'PASSWORDS-MISMATCH':
      return {
        ...state,
        signupError: "Passwords Don't Match"
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
