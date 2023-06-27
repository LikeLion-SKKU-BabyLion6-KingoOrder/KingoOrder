import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Reducer from './_reducers';


import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise'; // redux-promise 가져오기
import ReduxThunk from 'redux-thunk'; // redux-promise 가져오기

const createStoreSithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStoreSithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
      <App />
  </Provider>
);

reportWebVitals();

