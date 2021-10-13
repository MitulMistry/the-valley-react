export const RESET_POINTS = 'RESET_POINTS';
export const CHANGE_POINTS = 'CHANGE_POINTS';

export const resetPoints = () => ({
  type: RESET_POINTS
});

export const changePoints = (power, karma, darkTetrad, intellect, love) => ({
  type: CHANGE_POINTS,
  power,
  karma,
  darkTetrad,
  intellect,
  love,
});