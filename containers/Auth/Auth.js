import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Loader  from 'react-loader-spinner';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { updateObject, validityHandler } from '../../shared/utility';

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      valueType: 'email address',
      elementConfig: {
        type: 'email',
        placeholder: 'Your email'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      valueType: 'password',
      elementConfig: {
        type: 'password',
        placeholder: 'Your password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  })
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if(!props.building && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const inputChangedHandler = (event, elementIdentifier) => {
    const updatedControls = updateObject(authForm, {
      [elementIdentifier]: updateObject(authForm[elementIdentifier], {
        value: event.target.value,
        valid: validityHandler(event.target.value, authForm[elementIdentifier].validation),
        touched: true
      })
    })
    setAuthForm(updatedControls);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
  }

  const toggleAuthModeHandler = (event) => {
    event.preventDefault();
    setIsSignUp(!isSignUp);
  }


  let formElements = [];

  for(let key in authForm) {
    formElements.push({id: key, config: authForm[key]});
  }

  let form = (
    <form onSubmit={submitHandler}>
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
      <Button btnType="Order">{isSignUp ? 'Sign Up' : 'Log In'}</Button><br />
      <a href="/" onClick={toggleAuthModeHandler}>{isSignUp ? 'Already have an account? Sign in.' : 'Don\'t have an account yet? Sign up'}</a>
    </form>
  )

  if(props.loading) {
    form = <Loader type="Circles" color="#2BAD60" height="100" width="100" />
  }

  let errorMessage = null;
  if(props.error) {
    errorMessage = (
      <p style={{color: 'red'}}>{props.error}</p>
    )
  }

  let redirect = null;
  if(props.isAuthenticated) {
    redirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      { redirect }
      { errorMessage }
      { form }
    </div>
  );

}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    authRedirectPath: state.auth.authRedirectPath,
    building: state.burger.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);