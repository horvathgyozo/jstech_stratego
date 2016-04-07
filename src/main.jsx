import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './redux/index';
// import {selectSoldier} from './redux/actions';

let store = createStore(reducer,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

// console.log( store.getState() );

// store.subscribe(() =>
//   console.log(store.getState())
// );

// store.dispatch(selectSoldier('alma'));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
);
