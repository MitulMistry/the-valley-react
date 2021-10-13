import { combineReducers } from 'redux';

import gameLogReducer from './gameLogReducer.js';
import pointsReducer from './pointsReducer.js';
import variablesReducer from './variablesReducer.js';
import textReducer from './textReducer.js';
import dataReducer from './dataReducer.js';

const rootReducer = combineReducers({
  game: gameLogReducer,
  points: pointsReducer,
  variables: variablesReducer,
  text: textReducer,
  data: dataReducer
});

export default rootReducer;