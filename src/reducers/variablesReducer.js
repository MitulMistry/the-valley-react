import { CHANGE_VARIABLES } from '../actions/variablesActions';

const variablesReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
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