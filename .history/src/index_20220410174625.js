import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import reportWebVitals from './reportWebVitals';
import store, { persistor } from './store/configureStore';
import App from './App';
import './index.css';
import './api/firebase';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
