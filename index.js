import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import burgerReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas';

const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) : null || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrders);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
