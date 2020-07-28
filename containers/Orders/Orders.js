import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const Orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId)
  }, [])

  const deleteOrderHandler = (id) => {
    props.onDeleteOrder(id, props.token);
  }


  let orders = <Spinner />
  if(!props.loading && props.orders.length === 0) {
    orders = <p style={{textAlign: 'center'}}>You have no orders yet</p>
  } else if(!props.loading && props.orders.length > 0) {
    orders = (
      props.orders.map(order => (
        <Order key={order.id} ingredients={order.ingredients} price={+order.price} clicked={() => deleteOrderHandler(order.id)} />
      ))
    )
  }
  return(
    <div>
      { orders }
    </div>
  )
}


const mapStateToProps = state => {
  return {
    orders: state.order.order,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    onDeleteOrder: (id, token) => dispatch(actions.deleteOrder(id, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));