export const RESET_VARIABLES = 'RESET_VARIABLES';
export const SET_VARIABLES = 'SET_VARIABLES';

export const resetVariables = () => ({
  type: RESET_VARIABLES
});

export const setVariables = (variablesObject) => ({
  type: SET_VARIABLES,
  variablesObject,
});