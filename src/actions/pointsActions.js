export const CHANGE_POINTS = 'CHANGE_POINTS';

export const changePoints = (power, karma, darkTetrad, intellect, love) => ({
  type: CHANGE_POINTS,
  power,
  karma,
  darkTetrad,
  intellect,
  love,
});