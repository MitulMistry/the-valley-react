export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const ADD_TO_LOG = 'ADD_TO_LOG';
export const SET_CURRENT_MODULE = 'SET_CURRENT_MODULE';
export const SET_CURRENT_NODE_KEY = 'SET_CURRENT_NODE_KEY';

export const startGame = () => ({
  type: START_GAME
});

export const endGame = () => ({
  type: END_GAME
});

export const addToLog = (textNodeKey, choiceNodeKey) => ({
  type: ADD_TO_LOG,
  textNodeKey,
  choiceNodeKey,
});

export const setCurrentModule = module => ({
  type: SET_CURRENT_MODULE,
  module,
});

export const setCurrentNodeKey = nodeKey => ({
  type: SET_CURRENT_NODE_KEY,
  nodeKey,
});