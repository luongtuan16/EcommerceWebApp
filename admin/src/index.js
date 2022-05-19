import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);
