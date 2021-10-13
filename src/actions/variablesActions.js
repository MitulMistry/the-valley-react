export const RESET_VARIABLES = 'RESET_VARIABLES';
export const CHANGE_VARIABLES = 'CHANGE_VARIABLES';

export const resetVariables = () => ({
  type: RESET_VARIABLES
});

export const changeVariables = (reference, value) => ({
  type: CHANGE_VARIABLES,
  reference,
  value,
});