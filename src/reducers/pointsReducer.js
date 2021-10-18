import { RESET_POINTS, CHANGE_POINTS } from '../actions/pointsActions';

const initialState = {
  power: 0,
  karma: 0,
  darkTetrad: 0,
  intellect: 0,
  love: 0,
}

const pointsReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);
  
  switch(action.type) {
    case RESET_POINTS:
      nextState = Object.assign({}, state);
      nextState.power = initialState.power;
      nextState.karma = initialState.karma;
      nextState.darkTetrad = initialState.darkTetrad;
      nextState.intellect = initialState.intellect;
      nextState.love = initialState.love;
      return nextState;
    case CHANGE_POINTS:
      nextState = Object.assign({}, state);
      const points = action.pointsObject;
      nextState.power += points.power;
      nextState.karma += points.karma;
      nextState.darkTetrad += points.darkTetrad;
      nextState.intellect += points.intellect;
      nextState.love += points.love;
      return nextState;
    default:
      return state;
  }
};

export default pointsReducer;