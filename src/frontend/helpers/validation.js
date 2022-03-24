export function validationForSignIn(state, dispatch) {
  const { email, password } = state;
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

export function validationForSignUp(state, dispatch) {
  const { username, email, password, cnfPassword } = state;
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
