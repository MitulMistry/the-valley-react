import {
  START_GAME,
  ADD_TO_LOG,
  SET_CURRENT_MODULE,
  SET_CURRENT_NODE_KEY
} from '../actions/gameLogActions';

import constants from '../globals/constants';

const initialState = {
  debugMode: false,
  gameStarted: false,
  gameLog: [],
  module: constants.MODULE_ASCENT_OF_MAN,
  nodeKey: constants.ASCENT_OF_MAN_STARTING_KEY
}

const gameLogReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
    case START_GAME:
      nextState = Object.assign({}, state);
      nextState.gameStarted = true;
      nextState.gameLog = [];
      nextState.module = initialState.module;
      nextState.nodeKey = initialState.nodeKey;
      return nextState;
    case ADD_TO_LOG:
      nextState = Object.assign({}, state);
      nextState.gameLog.push({
        textNodeKey: action.textNodeKey,
        decision: action.decision
      });
      return nextState;
    case SET_CURRENT_MODULE:
      nextState = Object.assign({}, state);
      nextState.module = action.module;
      return nextState;
    case SET_CURRENT_NODE_KEY:
      nextState = Object.assign({}, state);
      nextState.nodeKey = action.nodeKey;
      return nextState;
    default:
      return state;
  }
};

export default gameLogReducer;