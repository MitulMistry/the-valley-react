export const ADD_TO_LOG = 'ADD_TO_LOG';
export const SET_CURRENT_MODULE = 'SET_CURRENT_MODULE';
export const SET_CURRENT_NODE_KEY = 'SET_CURRENT_NODE_KEY';

export const addToLog = decision => ({
  type: ADD_TO_LOG,
  decision,
});

export const setCurrentModule = module => ({
  type: SET_CURRENT_MODULE,
  module,
});

export const setCurrentNodeKey = nodeKey => ({
  type: SET_CURRENT_NODE_KEY,
  nodeKey,
});