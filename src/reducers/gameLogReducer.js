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
  currentModule: constants.MODULE_ASCENT_OF_MAN,
  currentNodeKey: constants.ASCENT_OF_MAN_STARTING_KEY
}

const gameLogReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
    case START_GAME:
      nextState = Object.assign({}, state);
      nextState.gameStarted = true;
      nextState.gameLog = [];
      nextState.currentModule = initialState.currentModule;
      nextState.currentNodeKey = initialState.currentNodeKey;
      return nextState;
    case ADD_TO_LOG:
      nextState = Object.assign({}, state);
      nextState.gameLog.push({
        textNodeKey: action.textNodeKey,
        choiceNodeKey: action.choiceNodeKey
      });
      return nextState;
    case SET_CURRENT_MODULE:
      nextState = Object.assign({}, state);
      nextState.currentModule = action.module;
      return nextState;
    case SET_CURRENT_NODE_KEY:
      nextState = Object.assign({}, state);
      nextState.currentNodeKey = action.nodeKey;
      return nextState;
    default:
      return state;
  }
};

export default gameLogReducer;