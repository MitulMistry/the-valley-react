import {
  SET_TEXT_DATA,
  SET_LINK_NODES_DATA,
  SET_CHOICES_DATA,
  SET_ALL_DATA
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
    case SET_LINK_NODES_DATA:
      nextState = Object.assign({}, state);
      nextState.linkNodesData = action.data;
      return nextState;
    case SET_CHOICES_DATA:
      nextState = Object.assign({}, state);
      nextState.choicesData = action.data;
      return nextState;
    case SET_ALL_DATA:
      nextState = Object.assign({}, state);
      nextState.textData = action.textData;
      nextState.linkNodesData = action.linkNodesData;
      nextState.choicesData = action.choicesData;
      return nextState;
    default:
      return state;
  }
}

export default dataReducer;