import constants from "../globals/constants";

export function checkIfGameOver(currentNodeKey) {
  return (currentNodeKey === constants.DEATH_KEY || currentNodeKey === constants.END_KEY);
}

export function checkIfGameEnded(currentNodeKey) {
  return (currentNodeKey === constants.END_KEY);
}

export function checkIfGameDead(currentNodeKey) {
  return (currentNodeKey === constants.DEATH_KEY);
}