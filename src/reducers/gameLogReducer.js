import {
  START_GAME,
  ADD_TO_LOG,
  SET_CURRENT_MODULE,
  SET_CURRENT_NODE_KEY
} from '../actions/gameLogActions';

const gameLogReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
    case START_GAME:
      nextState = Object.assign({}, state);
      nextState.gameStarted = true;
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