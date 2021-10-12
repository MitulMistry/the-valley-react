import { SET_TEXT, SET_CHOICES } from '../actions/textActions';

const textReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
    case SET_TEXT:
      nextState = Object.assign({}, state);
      nextState.text = action.text;
      return nextState;
    case SET_CHOICES:
      nextState = Object.assign({}, state);
      nextState.choices = action.choices;
      return nextState;
    default:
      return state;
  }
};

export default textReducer;