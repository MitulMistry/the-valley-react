import {
  ADD_TO_LOG,
  SET_CURRENT_MODULE,
  SET_CURRENT_NODE_KEY
} from '../actions/gameLogActions';

const gameLogReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
    case ADD_TO_LOG:

      return nextState;
    case SET_CURRENT_MODULE:

      return nextState;
    case SET_CURRENT_NODE_KEY:
      
      return nextState;
    default:
      return state;
  }
};

export default gameLogReducer;