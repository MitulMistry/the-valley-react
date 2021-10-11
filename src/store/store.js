import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

import constants from '../globals/constants';

const initialState = {
  debugMode: false,
  gamelog: [],
  module: constants.MODULE_ASCENT_OF_MAN,
  nodeKey: constants.ASCENT_OF_MAN_STARTING_KEY,
  playerPoints: {
    power: 0,
    karma: 0,
    darkTetrad: 0,
    intellect: 0,
    love: 0,
  },
  playerVariables: new Map(),
  text: "Placeholder text.",
  choices: [
    {
      KEY: "AA000AA000AB01",
      text: "Placeholder text."
    },
    {
      KEY: "AA000AA000AB02",
      text: "Placeholder text."
    }
  ],
  textData: {},
  choicesData: {},
  linkNodesData: {}
}

const configureStore = (preloadedState = initialState) => {
  const store = createStore(rootReducer, preloadedState);
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