import { combineReducers } from 'redux';

import gameLogReducer from './gameLogReducer.js';
import pointsReducer from './pointsReducer.js';
import variablesReducer from './variablesReducer.js';
import textReducer from './textReducer.js';

const rootReducer = combineReducers({
  gameLog: gameLogReducer,
  points: pointsReducer,
  variables: variablesReducer,
  text: textReducer
});

export default rootReducer;