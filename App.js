import React, { useEffect, Suspense } from 'react';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import AsyncComponent from './hoc/asyncComponent/asyncComponent';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
})


const App = props => {
  const tryAutoLogin = props.onCheckAuthState;
  useEffect(() => {
    tryAutoLogin();
  }, [tryAutoLogin]);

    let routes = (
      <Switch>
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

  if(props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  };

  return (
    <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {routes}
          </Suspense>
        </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
