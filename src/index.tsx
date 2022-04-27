import { StrictMode } from 'react';
import { render } from 'react-dom';

import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import App from './components/app/app';
import { createApi } from './api';
import rootReducer from './reducer/reducer';


const api = createApi();

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk.withExtraArgument(api)]
});


render(
  <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
