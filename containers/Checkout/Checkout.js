import React from 'react';

import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

const Checkout = props => {
  const checkoutContinuedHandler = () => {
    props.history.push({pathname: props.match.path + '/contact-data'});
  }

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }


  let summary = <Redirect to="/" />

  if(props.ings) {
    let redirect = props.purchased ? <Redirect to="/" /> : null
    summary = <div>
      { redirect }
      <CheckoutSummary ingredients={props.ings}
      checkoutCancelled={checkoutCancelledHandler}
      checkoutContinued={checkoutContinuedHandler} />
      <Route path={props.match.path + '/contact-data'} component={ContactData} />
    </div>
  }
  return summary
}


const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);