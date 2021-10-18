export const RESET_POINTS = 'RESET_POINTS';
export const CHANGE_POINTS = 'CHANGE_POINTS';

export const resetPoints = () => ({
  type: RESET_POINTS
});

export const changePoints = (pointsObject) => ({
  type: CHANGE_POINTS,
  pointsObject,
});