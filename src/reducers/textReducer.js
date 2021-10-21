import {
  RESET_TEXT_CHOICES,
  SET_TEXT,
  SET_CHOICES,
  RESET_TEXT_UPDATE } from '../actions/textActions';

const initialState = {
  text: "Placeholder text.",
  textWasUpdated: true,
  choices: [
    {
      KEY: "AA000AA000AB01",
      text: "Placeholder text."
    },
    {
      KEY: "AA000AA000AB02",
      text: "Placeholder text."
    }
  ]
}

const textReducer = (state = initialState, action) => {
  let nextState;
  Object.freeze(state);

  switch(action.type) {
    case RESET_TEXT_CHOICES:
      nextState = Object.assign({}, state);
      nextState.text = initialState.text;
      nextState.choices = initialState.choices;
      nextState.textWasUpdated = initialState.textWasUpdated;
      return nextState;
    case SET_TEXT:
      nextState = Object.assign({}, state);
      nextState.text = action.text;
      nextState.textWasUpdated = true;
      return nextState;
    case SET_CHOICES:
      nextState = Object.assign({}, state);
      nextState.choices = action.choices;
      nextState.textWasUpdated = true;
      return nextState;
    case RESET_TEXT_UPDATE:
      nextState = Object.assign({}, state);
      nextState.textWasUpdated = false;
      return nextState;
    default:
      return state;
  }
};

export default textReducer;