import { CHANGE_POINTS } from '../actions/pointsActions';

const pointsReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);
  
  switch(action.type) {
    case CHANGE_POINTS:

      return nextState;
    default:
      return state;
  }
};

export default pointsReducer;