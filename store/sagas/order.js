import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
      const response = yield axios.post('/orders.json?auth=' +  action.token, action.order)
      yield put(actions.purchaseBurgerSuccess(response.data.name, action.order));
    } catch(error) {
      yield put(actions.purchaseBurgerFailed(error));
    }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrderStart());
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  try {
    const response = yield axios.get('/orders.json' + queryParams)
    const fetchedOrders = [];
    for(let key in response.data) {
      fetchedOrders.push({...response.data[key], id: key});
    }
    yield put(actions.fetchOrderSuccess(fetchedOrders));
  } catch(error) {
    yield put(actions.fetchOrderFailed(error));
  }      
}

export function* deleteOrderSaga(action) {
  yield put(actions.deleteOrderStart());
  try {
    yield axios.delete(`/orders/${action.orderId}.json?auth=` + action.token);
    yield put(actions.deleteOrderSuccess(action.orderId));
  } catch(error) {
    yield put(actions.deleteOrderFailed());
  }
}