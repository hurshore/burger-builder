import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: checkError(error.message)
  }
}

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_INIT_LOGOUT
  }
}
export const authLogoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.CHECK_AUTH_TIMEOUT,
    expirationTime: expirationTime
  }
}

export const checkAuthState = () => {
  return {
    type: actionTypes.CHECK_AUTH_STATE
  }
}

//Error checker
const checkError = (error) => {
  switch(error) {
    case 'EMAIL_EXISTS':
      return 'Email already exists';
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      return 'Too many attempts. Try again later';
    case 'EMAIL_NOT_FOUND':
      return 'Email not found';
    case 'INVALID_PASSWORD':
      return 'Invalid password';
    case 'INVALID_EMAIL':
      return 'Invalid email'
    case 'USER_DISABLED':
      return 'Your account has been temporarily disabled';
    case 'WEAK_PASSWORD : Password should be at least 6 characters':
      return 'Weak password. Password should be at least 6 characters';
    default:
      return error;
  }
}