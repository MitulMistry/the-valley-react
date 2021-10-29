import constants from '../globals/constants'

// Convert text values for point costs to numerical values based on constants
export function parseChoiceCost(stringToParse) {
  switch (stringToParse) {
    case 'mini01':
      return constants.POINT_COST_MINI_01;
    case 'mini02':
      return constants.POINT_COST_MINI_02;
    case 'mini03':
      return constants.POINT_COST_MINI_03;
    case 'moderate01':
      return constants.POINT_COST_MODERATE_01;
    case 'moderate02':
      return constants.POINT_COST_MODERATE_02;
    case 'moderate03':
      return constants.POINT_COST_MODERATE_03;
    case 'heavy01':
      return constants.POINT_COST_HEAVY_01;
    case 'heavy02':
      return constants.POINT_COST_HEAVY_02;
    case 'heavy03':
      return constants.POINT_COST_HEAVY_03;
    case 'mega01':
      return constants.POINT_COST_MEGA_01;
    case 'mega02':
      return constants.POINT_COST_MEGA_02;
    case 'mega03':
      return constants.POINT_COST_MEGA_03;
    default:
      return 0;
  }
}

// Convert text values for point boosts to numerical values based on constants
export function parseChoiceBoost(stringToParse) {
  switch (stringToParse) {
    case 'small':
      return constants.POINT_BOOST_SMALL;
    case 'medium':
      return constants.POINT_BOOST_MEDIUM;
    case 'large':
      return constants.POINT_BOOST_LARGE;
    case 'large02':
      return constants.POINT_BOOST_LARGE02;
    case 'huge':
      return constants.POINT_BOOST_HUGE;
    case 'jackpot':
      return constants.POINT_BOOST_JACKPOT;
    default:
      return 0;
  }
}