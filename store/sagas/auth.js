import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.authLogoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS4g88vPbLSGumCzpzBh3eufHGUf_RB3o';
  if(!action.isSignUp) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDS4g88vPbLSGumCzpzBh3eufHGUf_RB3o';
  }

  try {
    const response = yield axios.post(url, authData);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    console.log(response.data);
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    if(error.message === 'Network Error') {
      yield put(actions.authFailed(error));
    } else {
      yield put(actions.authFailed(error.response.data.error));
    }
  }
}

export function* checkAuthStateSaga(action) {
    const token = localStorage.getItem('token');
    if(!token) {
      yield put(actions.authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate <= new Date()) {
        yield put(actions.authLogout());
      } else {
        const userId = localStorage.getItem('userId');
        yield put(actions.authSuccess(token, userId));
        yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
}