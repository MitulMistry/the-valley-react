import { createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

const configureStore = (preloadedState = {}) => {
  let buildStore;

  // Add Redux Dev Tools and Logger only in development environment
  if (process.env.NODE_ENV !== "production") {
    // Must use 'require' (import only allowed at top of file)
    const { applyMiddleware } = require('redux');
    const { composeWithDevTools } = require('@redux-devtools/extension');
    const { logger } = require('redux-logger');

    buildStore = createStore(
      rootReducer,
      preloadedState,
      composeWithDevTools(applyMiddleware(thunk, logger))
      );

  } else {
    buildStore = createStore(
      rootReducer,
      preloadedState
      );
  }

  const store = buildStore;

  store.subscribe(() => {
    let state = store.getState();
    
    // Don't put loaded JSON data in browser storage
    let modifiedState = {
      ...state,
      data: {
        textData: {},
        choicesData: {},
        linkNodesData: {}
      }
    }
    
    localStorage.state = JSON.stringify(modifiedState);
  });
  return store;
}

export default configureStore;