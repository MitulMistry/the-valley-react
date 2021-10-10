export const SET_TEXT = 'SET_TEXT';
export const SET_CHOICES = 'SET_CHOICES';

export const setText = text => ({
  type: SET_TEXT,
  text,
});

export const setChoices = choices => ({
  type: SET_CHOICES,
  choices,
});