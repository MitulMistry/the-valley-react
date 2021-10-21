export const RESET_TEXT_CHOICES = 'RESET_TEXT_CHOICES';
export const SET_TEXT = 'SET_TEXT';
export const SET_CHOICES = 'SET_CHOICES';
export const RESET_TEXT_UPDATE = 'RESET_TEXT_UPDATE';

export const resetTextChoices = () => ({
  type: RESET_TEXT_CHOICES
});

export const setText = text => ({
  type: SET_TEXT,
  text,
});

export const setChoices = choices => ({
  type: SET_CHOICES,
  choices,
});

export const resetTextUpdate = () => ({
  type: RESET_TEXT_UPDATE
});