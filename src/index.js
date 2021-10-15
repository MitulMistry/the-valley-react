import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// Load previous state from browser's localStorage into Redux store
// if it exists, otherwise use empty object. Define store at top level
// so it can be exported to be used with GameManager class.s
const preloadedState = localStorage.state ?
  JSON.parse(localStorage.state) : {};
const store = configureStore(preloadedState);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
});

// Export Redux store so it can be imported into GameManager class and accessed
// in its static methods. For React components, use Connect() instead.
export { store };