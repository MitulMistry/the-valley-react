import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

import constants from '../globals/constants';

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, logger))
    );

  store.subscribe(() => {
    let state = store.getState();

    // Don't put loaded JSON data in browser storage
    state.textData = {};
    state.choicesData = {};
    state.linkNodesData = {};
    
    localStorage.state = JSON.stringify(state);
  });
  return store;
}

export default configureStore;