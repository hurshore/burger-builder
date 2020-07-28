import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (order, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    order: order,
    token: token
  }
}

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE
  }
}

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  }
}

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders
  }
}

export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
    error: error
  }
}

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId
  }
}

// export const deleteOrder = (orderId) => {
//   return {
//     type: actionTypes.DELETE_ORDER,
//     id: orderId
//   }
// }

export const deleteOrderStart = () => {
  return {
    type: actionTypes.DELETE_ORDER_START
  }
}

export const deleteOrderSuccess = (orderId) => {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    id: orderId
  }
}

export const deleteOrderFailed = () => {
  return {
    type: actionTypes.DELETE_ORDER_FAILED
  }
}

export const deleteOrder = (orderId, token) => {
  return {
    type: actionTypes.DELETE_ORDER,
    orderId: orderId,
    token: token
  }
}