import { CHANGE_POINTS } from '../actions/pointsActions';

const pointsReducer = (state = {}, action) => {
  let nextState;
  Object.freeze(state);
  
  switch(action.type) {
    case CHANGE_POINTS:
      nextState = Object.assign({}, state);
      nextState.playerPoints.power += action.power;
      nextState.playerPoints.karma += action.karma;
      nextState.playerPoints.darkTetrad += action.darkTetrad;
      nextState.playerPoints.intellect += action.intellect;
      nextState.playerPoints.love += action.love;
      return nextState;
    default:
      return state;
  }
};

export default pointsReducer;