import {
  SET_TEXT_DATA,
  SET_LINKS_DATA,
  SET_CHOICES_DATA
} from '../actions/dataActions';

const dataReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case SET_TEXT_DATA:

      return nextState;
    case SET_LINKS_DATA:

      return nextState;
    case SET_CHOICES_DATA:

      return nextState;
    default:
      return state;
  }
}

export default dataReducer;