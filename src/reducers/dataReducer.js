import {
  SET_TEXT_DATA,
  SET_LINKS_DATA,
  SET_CHOICES_DATA
} from '../actions/dataActions';

const initialState = {
  textData: {},
  linkNodesData: {},
  choicesData: {}
}

const dataReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch (action.type) {
    case SET_TEXT_DATA:
      nextState = Object.assign({}, state);
      nextState.textData = action.data;
      return nextState;
    case SET_LINKS_DATA:
      nextState = Object.assign({}, state);
      nextState.linkNodesData = action.data;
      return nextState;
    case SET_CHOICES_DATA:
      nextState = Object.assign({}, state);
      nextState.choicesData = action.data;
      return nextState;
    default:
      return state;
  }
}

export default dataReducer;