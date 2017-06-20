import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppReducer from './reducers';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from "redux";
import './index.css';

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
let store = finalCreateStore(AppReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
