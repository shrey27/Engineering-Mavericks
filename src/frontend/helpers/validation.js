export function validationForSignIn(state, dispatch) {
  const { email, password } = state;
  const errorArray = [];
  if (
    !email ||
    !email.match(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    )
  ) {
    errorArray.push('EMAIL-INCORRECT');
  }
  if (!password || password.length < 8) {
    errorArray.push('PASSWORD-INCORRECT');
  }
  if (errorArray.length) {
    errorArray.forEach((elem) => dispatch({ type: elem }));
    return false;
  }
  return true;
}

export function validationForSignUp(state, dispatch) {
  const { username, email, password, cnfPassword } = state;
  const errorArray = [];
  if (!username || !username.match(/^[a-zA-Z ]+/)) {
    errorArray.push('SIGNUP-USERNAME-ERROR');
  }
  if (
    !email ||
    !email.match(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    )
  ) {
    errorArray.push('EMAIL-INCORRECT');
  }
  if (!password || password.length < 8) {
    errorArray.push('PASSWORD-INCORRECT');
  }
  if (!cnfPassword || cnfPassword.length < 8) {
    errorArray.push('CONFIRM-PASSWORD-INCORRECT');
  }
  if (cnfPassword !== password) {
    errorArray.push('PASSWORDS-MISMATCH');
  }
  if (errorArray.length) {
    errorArray.forEach((elem) => dispatch({ type: elem }));
    return false;
  }
  return true;
}
