import { RESET_VARIABLES, SET_VARIABLES } from '../actions/variablesActions';

const initialState = {
  playerVariables: {}
}

const variablesReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
    case RESET_VARIABLES:
      nextState = Object.assign({}, state);
      nextState.playerVariables = initialState.playerVariables;
      return nextState;
    case SET_VARIABLES:
      nextState = Object.assign({}, state);
      nextState.playerVariables = action.variablesObject;
      return nextState;
    default:
      return state;
  }
};

export default variablesReducer;