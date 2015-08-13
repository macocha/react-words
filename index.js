import React from 'react';
import App from './containers/App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { wordsGame } from './reducers/wordsGameReducers';

import './style.css'
import './polyfills'

//Create redux store
let store = createStore(wordsGame);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
