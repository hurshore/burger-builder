import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get('https://react-my-burger-f9637.firebaseio.com/ingredients.json')
    yield put(actions.setIngredients(response.data));
  } catch(error) {
    console.log('[Burger Builder] Saga Error',error.message);
    yield put(actions.fetchIngredientError());
  }
}