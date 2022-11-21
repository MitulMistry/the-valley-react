import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

const configureStore = (preloadedState = {}) => {
  let createdStore;

  // Add Redux Dev Tools and Logger only in development environment
  if (process.env.NODE_ENV !== 'production') {
    // Must use 'require' (import only allowed at top of file)
    const { composeWithDevTools } = require('@redux-devtools/extension');
    const { logger } = require('redux-logger');

    createdStore = createStore(
      rootReducer,
      preloadedState,
      composeWithDevTools(applyMiddleware(thunk, logger))
    );

  } else {
    createdStore = createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(thunk)
    );
  }

  const store = createdStore;

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