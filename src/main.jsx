import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from './redux/index';
// import {selectSoldier} from './redux/actions';

import io from 'socket.io-client';
import { joinedTheGame, startTheGame } from './redux/actions';

var socket = io('http://localhost:3000');

socket.on('joined', function (data) {
  console.log(data);
  store.dispatch(joinedTheGame(data));
});

socket.on('startGame', function () {
  store.dispatch(startTheGame());
});

var remoteMiddleware = socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    if (action.type === 'JOIN_THE_GAME') {
      console.log('joinnnn')
      socket.emit('join');
    }
  }
  return next(action);
};

const createStoreWithMiddleware = applyMiddleware(
  remoteMiddleware(socket)
)(createStore);

let store = createStoreWithMiddleware(reducer,
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
