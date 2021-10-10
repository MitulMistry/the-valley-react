import { CHANGE_VARIABLES } from '../actions/variablesActions';

const variablesReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
    case CHANGE_VARIABLES:

      return nextState;
    default:
      return state;
  }
};

export default variablesReducer;