import { StrictMode } from 'react';
import { render } from 'react-dom';
import { reducer } from "./reducer/data-reducer";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from 'react-redux';

import App from './components/app/app';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createApi } from './api';

const api = createApi();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

render(
  <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
