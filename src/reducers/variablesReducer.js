import { RESET_VARIABLES, CHANGE_VARIABLES } from '../actions/variablesActions';

const initialState = {
  playerVariables: new Map() 
}

const variablesReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
    case RESET_VARIABLES:
      nextState = Object.assign({}, state);
      nextState.playerVariables = initialState.playerVariables;
      return nextState;
    case CHANGE_VARIABLES:
      nextState = Object.assign({}, state);

      // Check if the variable already exists. If it does, update it.
      if (nextState.playerVariables.has(action.reference)) {
        let original = nextState.playerVariables.get(action.reference);
        nextState.playerVariables.set(action.reference, original + action.value);
      } else {
        nextState.playerVariables.set(action.reference, action.value);
      }

      return nextState;
    default:
      return state;
  }
};

export default variablesReducer;