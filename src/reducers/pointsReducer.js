import { RESET_POINTS, CHANGE_POINTS } from '../actions/pointsActions';

const initialState = {
  playerPoints: {
    power: 0,
    karma: 0,
    darkTetrad: 0,
    intellect: 0,
    love: 0,
  }
}

const pointsReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);
  
  switch(action.type) {
    case RESET_POINTS:
      nextState = Object.assign({}, state);
      nextState.playerPoints = initialState.playerPoints;
      return nextState;
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