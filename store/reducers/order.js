import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  order: [],
  loading: false,
  purchased: false,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.INIT_PURCHASE:
      return updateObject(state, {purchased: false});
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {loading: true});
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.orderData, {id: action.orderId});
      return updateObject(state, {order: state.order.concat(newOrder), loading: false, purchased: true});
    case actionTypes.PURCHASE_BURGER_FAILED:
      return updateObject(state, {loading: false});
    case actionTypes.FETCH_ORDER_START:
      return updateObject(state, {loading: true})
    case actionTypes.FETCH_ORDER_SUCCESS:
      return updateObject(state, {order: action.orders, loading: false});
    case actionTypes.FETCH_ORDER_FAILED:
      return updateObject(state, {loading: false});
    case actionTypes.DELETE_ORDER_START:
      return updateObject(state, {loading: true});
    case actionTypes.DELETE_ORDER_SUCCESS:
      return updateObject(state, {order: state.order.filter(ord => ord.id !== action.id), loading: false});
    case actionTypes.DELETE_ORDER_FAILED:
      return updateObject(state, {loading: false});
    default:
      return state
  }
}

export default reducer;