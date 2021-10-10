import { SET_TEXT, SET_CHOICES } from '../actions/textActions';

const textReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
    case SET_TEXT:

      return nextState;
    case SET_CHOICES:
      
      return nextState;
    default:
      return state;
  }
};

export default textReducer;