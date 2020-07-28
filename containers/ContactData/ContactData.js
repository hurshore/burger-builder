import React, { useState } from 'react';

import { connect } from 'react-redux';
import classes from './ContactData.module.css';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, validityHandler } from '../../shared/utility';
import * as actions from '../../store/actions/index';

export const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      valueType: 'name',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name'
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      valueType: 'street',
      elementConfig: {
        type: 'text',
        placeholder: 'Your street'
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      valueType: 'zip code',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      valueType: 'country',
      elementConfig: {
        type: 'text',
        placeholder: 'Your country'
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      valueType: 'email address',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: 'fastest', displayedValue: 'Fastest'},
          {value: 'cheapest', displayedValue: 'Cheapest'}
        ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    const orderData = {}
    for(let elementIdentifier in orderForm) {
      orderData[elementIdentifier] = orderForm[elementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: orderData,
      userId: props.userId
    }
    props.onOrderBurger(order, props.token);
    
    event.preventDefault();
  }

  const inputChangedHandler = (event, elementIdentifier) => {
    const updatedInputElement = updateObject(orderForm[elementIdentifier], {
      value: event.target.value,
      valid: validityHandler(event.target.value, orderForm[elementIdentifier].validation),
      touched: true
    });
    const updatedOrderForm = updateObject(orderForm, {
      [elementIdentifier]: updatedInputElement
    })

    let formIsValid = true;
    for(let identifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[identifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  }


  let formElements = [];

  for(let key in orderForm) {
    formElements.push({id: key, config: orderForm[key]});
  }
  
  let form = (
    <form onSubmit={orderHandler}>
      {formElements.map(formElement => (
        <Input key={formElement.id}
        elementType={formElement.config.elementType} 
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => inputChangedHandler(event, formElement.id)}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        valueType={formElement.config.valueType} />
      ))}
      <Button btnType="Order" disabled={!formIsValid}>ORDER</Button>
    </form>
  )
  if(props.loading) {
    form = <Spinner />
  }
  return(
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  )
}


const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
  }
}

const matchDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(withErrorHandler(ContactData, axios));