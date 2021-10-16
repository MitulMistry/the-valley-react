import { setText, setChoices } from '../actions/textActions';

// Import Redux store from index.js where it is created.
// Store can be accessed with .getState() and can .dispatch() actions.
import { store } from '../index';

import globals from '../globals/globals';
import constants from '../globals/constants';
import systems from '../globals/systems';

// global variables
var storyText;

var choice1;
var choice2;
var choice3;
var choice4;
var choice5;
var loadedChoices = []; // array of index numbers to be used in the loaded JSON choice data object
var choicesColorArray = []; // array of colors for each choice # to reference which color to return to after a mouse over
var continueText = 'Continue...'; // Text to show when the choice is only to continue

var choicesTextGroup;
var textPointsPower;
var textPointsKarma;
var textPointsIntellect;
var textPointsLove;
var textPointsDarkTetrad;

var storyText;
var slider01;
var slider02;
var slider01back;
var slider02back;

var choicesHeight = 100;
var choicesSpacer = 15;
var textFadeInLength = 500;
var choicesFadeInLength = 200;

var rightSliderGap01;
var text01Distance;
var text01TopGap;

var rightSliderGap02;
var text02Distance;
var text02TopGap;

var frame01Width;
var frame01Height;
var frame01XPos;
var frame01YPos;

var frame02Width;
var frame02Height;
var frame02XPos;
var frame02YPos;

var textMask01;
var textMask02;

var mainFont = '500 12.5pt Fira Sans'; // 13pt
var choiceColor = '#FFFFFF';
var fontColorPower = '#F45E14';
var fontColorKarma = '#12B516';
var fontColorIntellect = '#00B0FF';
var fontColorLove = '#FC32DA';
var fontColorDarkTetrad = '#E60B1A';

export default class {
  
  static loadGame() {
    this.loadText();
    this.loadChoices();
  }

  static loadText() {
    const key = store.getState().game.currentNodeKey;
    const text = store.getState().data.textData[key];
    store.dispatch(setText(text));
  }

  static loadChoices() {
    let stringTest;
    let choices = [];

    const currentNodeKey = store.getState().game.currentNodeKey;
    const choicesData = store.getState().data.choicesData;

    // TODO: Refactor to not have to search through all data
    for (const i in choicesData) {
      stringTest = choicesData[i].KEY;
      if (stringTest.substring(0, 12) === currentNodeKey) {
        if (this.checkChoice(i)) {
          choices.push(choicesData[i]);
        }
      }
    }
    
    choices = this.addColorClasses(choices);
    store.dispatch(setChoices(choices));
  }

  // Choices in this game can have a cost based on collected points or other
  // variable requirements. This method checks if a choice is available to the
  // player based on the player's current points and past decisions (playerVariables).
  static checkChoice(choiceKey) {
    const choice = store.getState().data.choicesData[choiceKey];
    const playerPoints = store.getState().points;

    // Empty string '', null, undefined, and 0 are all falsy.
    // Choice costs in JSON data are defined using keywords like "mini01"
    // which are parsed and converted to integers based on imported constants.
    if (choice.karmaCost) {
      if (playerPoints.karma >= this.parseChoiceCost(choice.karmaCost)) {
        return true;
      } else {
        return false;
      }
    } else if (choice.powerCost) {
      if (playerPoints.power >= this.parseChoiceCost(choice.powerCost)) {
        return true;
      } else {
        return false;
      }
    } else if (choice.intellectCost) {
      if (playerPoints.intellect >= this.parseChoiceCost(choice.intellectCost)) {
        return true;
      } else {
        return false;
      }
    } else if (choice.loveCost) {
      if (playerPoints.love >= this.parseChoiceCost(choice.loveCost)) {
        return true;
      } else {
        return false;
      }
    } else if (choice.darkTetradCost) {
      if (playerPoints.darkTetrad >= this.parseChoiceCost(choice.powerDarkTetrad)) {
        return true;
      } else {
        return false;
      }
    // Check additional variables (playerVariables).
    // Is this choice available to the player based on their past decisions?
    } else if (choice.additionalVariableCostA_Key) {
      const condition1 = this.checkPlayerVariables(
        choice.additionalVariableCostA_Key,
        choice.additionalVariableCostA_Equivalence,
        choice.additionalVariableCostA_Value);

      if (choice.additionalVariableCostB_Key) {
        // There are two additional variable costs

        const condition2 = this.checkPlayerVariables(
          choice.additionalVariableCostB_Key,
          choice.additionalVariableCostB_Equivalence,
          choice.additionalVariableCostB_Value);

        if (choice.additionalVariableCost_Operator === '&&') {
          if (condition1 && condition2) {
            return true;
          } else {
            return false;
          }
        } else if (choice.additionalVariableCost_Operator === '||') {
          if (condition1 || condition2) {
            return true;
          } else {
            return false;
          }
        } else {
          // Then there's an error
          return false;
        }
      } else {
        // There's only one additional variable cost
        if (condition1) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      // There are no costs for this choice, so return true
      return true;
    }
  }

  // Adds class names to choices for what color the text should be.
  // These are the classNames that should be attached to the choices in React.
  static addColorClasses(choicesArray) {
    let newChoicesArray = [];

    // Iterate through array of choices, add colorClass property
    // based on point cost, and return new array of choices.
    choicesArray.forEach(choice => {    

      if (choice.karmaCost) {
        choice.colorClass = 'colorKarma';
      } else if (choice.powerCost) {
        choice.colorClass = 'colorKarma';
      } else if (choice.intellectCost) {
        choice.colorClass = 'colorKarma';
      } else if (choice.loveCost) {
        choice.colorClass = 'colorKarma';
      } else if (choice.darkTetradCost) {
        choice.colorClass = 'colorKarma';
      } else {
        choice.colorClass = 'colorChoice';
      }

      newChoicesArray.push(choice);
    });

    return newChoicesArray;
  }

  static parseChoiceCost(stringToParse) {
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

  parseChoiceBoost(stringToParse) {
    if (stringToParse === 'small') {
      return constants.POINT_BOOST_SMALL;
    } else if (stringToParse === 'medium') {
      return constants.POINT_BOOST_MEDIUM;
    } else if (stringToParse === 'large') {
      return constants.POINT_BOOST_LARGE;
    } else if (stringToParse === 'large02') {
      return constants.POINT_BOOST_LARGE02;
    } else if (stringToParse === 'huge') {
      return constants.POINT_BOOST_HUGE;
    } else if (stringToParse === 'jackpot') {
      return constants.POINT_BOOST_JACKPOT;
    } else {
      return 0;
    }
  }

  // This method checks for additional variables in the playerVariables object.
  // It checks on the player's past decisions based on a reference (the variable cost key),
  // the equivalence (logical operator), and value to be checked for. It then
  // returns a boolean (true or false) result.
  static checkPlayerVariables(reference, equivalence, value) {
    const playerVariables = store.getState().variables.playerVariables;
    const defaultValue = 0;

    // Search for reference and value pair in playerVariables object.
    // If found, checks for whether it's >, <, etc. to the value provided.
    // If it doesn't pass the test to the value, or if not found, it returns false.
    
    // Empty string, null, undefined, and 0 are all falsy
    if (!equivalence) {
      // Just search for whether the additional variable is present - value doesn't matter
      return (reference in playerVariables);
    } else if (equivalence === '=') {
      // Check for presence of variable and value
      return (playerVariables[reference] === value);
    } else if (equivalence === '!=' && (!value)) {
      // Checks if the additional variable is present at all and returns false if present, true if not
      // - opposite of first check in this series. e.g. if !(01JennethDead), then returns true.
      return !(reference in playerVariables);
    } else if (equivalence === '!=' && (value)) {
      if (reference in playerVariables && playerVariables[reference] !== value) {
        return true;
      } else if (value !== defaultValue) {
        // Variable not found, so assume default value (0)
        return true;
      } else {
        return false;
      }
    } else if (equivalence === '<') {
      if (reference in playerVariables && playerVariables[reference] < value) {
        return true;
      } else if (value < defaultValue) {
        // Variable not found, so assume default value (0)
        return true;
      } else {
        return false;
      }
    } else if (equivalence === '<=') {
      if (reference in playerVariables && playerVariables[reference] <= value) {
        return true;
      } else if (value <= defaultValue) {
        // Variable not found, so assume default value (0)
        return true;
      } else {
        return false;
      }
    } else if (equivalence === '>') {
      if (reference in playerVariables && playerVariables[reference] > value) {
        return true;
      } else if (value > defaultValue) {
        // Variable not found, so assume default value (0)
        return true;
      } else {
        return false;
      }
    } else if (equivalence === '>=') {
      if (reference in playerVariables && playerVariables[reference] >= value) {
        return true;
      } else if (value >= defaultValue) {
        // Variable not found, so assume default value (0)
        return true;
      } else {
        return false;
      }
    } else {
      // In case anything goes wrong, defaults to returning false
      console.log('%c checkPlayerVariables() error ', 'color:white; background:red;');
      return false;
    }
  }

  makeDecision(choiceNumber) {
    systems.currentSaveGame.writeToGameLog(systems.currentSaveGame.currentNodeKey, choiceNumber);

    // TODO: load choices from store - store.getState().text.choices
    var tempReference = loadedChoices[choiceNumber - 1]; // -1 because starts with 0, so choice 1 is key 0 in the array

    // ------------------Adjust player spirit points------------------
    this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].karmaBoost, globals.currentModuleChoicesData[tempReference].intellectBoost, globals.currentModuleChoicesData[tempReference].loveBoost, globals.currentModuleChoicesData[tempReference].powerBoost, globals.currentModuleChoicesData[tempReference].darkTetradBoost, globals.currentModuleChoicesData[tempReference].additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].additionalVariableBoostB_Value);

    // ------------------Randomize destinations------------------

    var dieRollDestinationA;
    var dieRollDestinationB;
    var dieRollDestinationC;
    var dieRollDestinationD;

    // alert(globals.currentModuleChoicesData[tempReference].destinationA_percentage);

    if (globals.currentModuleChoicesData[tempReference].destinationA_percentage === null || globals.currentModuleChoicesData[tempReference].destinationA_percentage === '' || globals.currentModuleChoicesData[tempReference].destinationA_percentage === undefined) {
      // There's only one destination, go to destinationA
      this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].destinationA_karmaBoost, globals.currentModuleChoicesData[tempReference].destinationA_intellectBoost, globals.currentModuleChoicesData[tempReference].destinationA_loveBoost, globals.currentModuleChoicesData[tempReference].destinationA_powerBoost, globals.currentModuleChoicesData[tempReference].destinationA_darkTetradBoost, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostB_Value);

      this.loadStoryNode(globals.currentModuleChoicesData[tempReference].destinationA);
    } else if (globals.currentModuleChoicesData[tempReference].destinationC_percentage === null || globals.currentModuleChoicesData[tempReference].destinationC_percentage === '' || globals.currentModuleChoicesData[tempReference].destinationC_percentage === undefined) {
      // There's no third destination, so it's between destinationA and destinationB
      dieRollDestinationA = (Math.floor(Math.random() * 100) + 1) * globals.currentModuleChoicesData[tempReference].destinationA_percentage;
      dieRollDestinationB = (Math.floor(Math.random() * 100) + 1) * globals.currentModuleChoicesData[tempReference].destinationB_percentage;

      if (dieRollDestinationA > dieRollDestinationB) {
        // go to destinationA
        this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].destinationA_karmaBoost, globals.currentModuleChoicesData[tempReference].destinationA_intellectBoost, globals.currentModuleChoicesData[tempReference].destinationA_loveBoost, globals.currentModuleChoicesData[tempReference].destinationA_powerBoost, globals.currentModuleChoicesData[tempReference].destinationA_darkTetradBoost, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostB_Value);

        this.loadStoryNode(globals.currentModuleChoicesData[tempReference].destinationA);
      } else {
        // go to destinationB
        this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].destinationB_karmaBoost, globals.currentModuleChoicesData[tempReference].destinationB_intellectBoost, globals.currentModuleChoicesData[tempReference].destinationB_loveBoost, globals.currentModuleChoicesData[tempReference].destinationB_powerBoost, globals.currentModuleChoicesData[tempReference].destinationB_darkTetradBoost, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostB_Value);

        this.loadStoryNode(globals.currentModuleChoicesData[tempReference].destinationB);
      }
    } else if (globals.currentModuleChoicesData[tempReference].destinationD_percentage === null || globals.currentModuleChoicesData[tempReference].destinationD_percentage === '') {
      // There's no fourth destination, so it's between destinationA and destinationB and destinationC
      dieRollDestinationA = (Math.floor(Math.random() * 100) + 1) * globals.currentModuleChoicesData[tempReference].destinationA_percentage;
      dieRollDestinationB = (Math.floor(Math.random() * 100) + 1) * globals.currentModuleChoicesData[tempReference].destinationB_percentage;
      dieRollDestinationC = (Math.floor(Math.random() * 100) + 1) * globals.currentModuleChoicesData[tempReference].destinationC_percentage;

      if (dieRollDestinationA > dieRollDestinationB && dieRollDestinationA > dieRollDestinationC) {
        // go to destinationA
        this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].destinationA_karmaBoost, globals.currentModuleChoicesData[tempReference].destinationA_intellectBoost, globals.currentModuleChoicesData[tempReference].destinationA_loveBoost, globals.currentModuleChoicesData[tempReference].destinationA_powerBoost, globals.currentModuleChoicesData[tempReference].destinationA_darkTetradBoost, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostB_Value);

        this.loadStoryNode(globals.currentModuleChoicesData[tempReference].destinationA);
      } else if (dieRollDestinationB > dieRollDestinationC) {
        // go to destinationB
        this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].destinationB_karmaBoost, globals.currentModuleChoicesData[tempReference].destinationB_intellectBoost, globals.currentModuleChoicesData[tempReference].destinationB_loveBoost, globals.currentModuleChoicesData[tempReference].destinationB_powerBoost, globals.currentModuleChoicesData[tempReference].destinationB_darkTetradBoost, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostB_Value);

        this.loadStoryNode(globals.currentModuleChoicesData[tempReference].destinationB);
      } else {
        // go to destinationC
        this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].destinationC_karmaBoost, globals.currentModuleChoicesData[tempReference].destinationC_intellectBoost, globals.currentModuleChoicesData[tempReference].destinationC_loveBoost, globals.currentModuleChoicesData[tempReference].destinationC_powerBoost, globals.currentModuleChoicesData[tempReference].destinationC_darkTetradBoost, globals.currentModuleChoicesData[tempReference].destinationC_additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].destinationC_additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].destinationC_additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].destinationC_additionalVariableBoostB_Value);

        this.loadStoryNode(globals.currentModuleChoicesData[tempReference].destinationC);
      }
    } else {
      // There are four destinations
      dieRollDestinationA = (Math.floor(Math.random() * 100) + 1) * globals.currentModuleChoicesData[tempReference].destinationA_percentage;
      dieRollDestinationB = (Math.floor(Math.random() * 100) + 1) * globals.currentModuleChoicesData[tempReference].destinationB_percentage;
      dieRollDestinationC = (Math.floor(Math.random() * 100) + 1) * globals.currentModuleChoicesData[tempReference].destinationC_percentage;
      dieRollDestinationD = (Math.floor(Math.random() * 100) + 1) * globals.currentModuleChoicesData[tempReference].destinationD_percentage;

      if (dieRollDestinationA > dieRollDestinationB && dieRollDestinationA > dieRollDestinationC && dieRollDestinationA > dieRollDestinationD) {
        // go to destinationA
        this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].destinationA_karmaBoost, globals.currentModuleChoicesData[tempReference].destinationA_intellectBoost, globals.currentModuleChoicesData[tempReference].destinationA_loveBoost, globals.currentModuleChoicesData[tempReference].destinationA_powerBoost, globals.currentModuleChoicesData[tempReference].destinationA_darkTetradBoost, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].destinationA_additionalVariableBoostB_Value);

        this.loadStoryNode(globals.currentModuleChoicesData[tempReference].destinationA);
      } else if (dieRollDestinationB > dieRollDestinationC && dieRollDestinationB > dieRollDestinationD) {
        // go to destinationB
        this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].destinationB_karmaBoost, globals.currentModuleChoicesData[tempReference].destinationB_intellectBoost, globals.currentModuleChoicesData[tempReference].destinationB_loveBoost, globals.currentModuleChoicesData[tempReference].destinationB_powerBoost, globals.currentModuleChoicesData[tempReference].destinationB_darkTetradBoost, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].destinationB_additionalVariableBoostB_Value);

        this.loadStoryNode(globals.currentModuleChoicesData[tempReference].destinationB);
      } else if (dieRollDestinationC > dieRollDestinationD) {
        // go to destinationC
        this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].destinationC_karmaBoost, globals.currentModuleChoicesData[tempReference].destinationC_intellectBoost, globals.currentModuleChoicesData[tempReference].destinationC_loveBoost, globals.currentModuleChoicesData[tempReference].destinationC_powerBoost, globals.currentModuleChoicesData[tempReference].destinationC_darkTetradBoost, globals.currentModuleChoicesData[tempReference].destinationC_additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].destinationC_additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].destinationC_additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].destinationC_additionalVariableBoostB_Value);

        this.loadStoryNode(globals.currentModuleChoicesData[tempReference].destinationC);
      } else {
        // go to destinationD
        this.adjustPlayerPoints(globals.currentModuleChoicesData[tempReference].destinationD_karmaBoost, globals.currentModuleChoicesData[tempReference].destinationD_intellectBoost, globals.currentModuleChoicesData[tempReference].destinationD_loveBoost, globals.currentModuleChoicesData[tempReference].destinationD_powerBoost, globals.currentModuleChoicesData[tempReference].destinationD_darkTetradBoost, globals.currentModuleChoicesData[tempReference].destinationD_additionalVariableBoostA_Key, globals.currentModuleChoicesData[tempReference].destinationD_additionalVariableBoostA_Value, globals.currentModuleChoicesData[tempReference].destinationD_additionalVariableBoostB_Key, globals.currentModuleChoicesData[tempReference].destinationD_additionalVariableBoostB_Value);

        this.loadStoryNode(globals.currentModuleChoicesData[tempReference].destinationD);
      }
    }
  }

  adjustPlayerPoints(karmaBoost, intellectBoost, loveBoost, powerBoost, darkTetradBoost, additionalVariableBoostA_Key, additionalVariableBoostA_Value, additionalVariableBoostB_Key, additionalVariableBoostB_Value) {
    // Adjust player spirit points
    if (karmaBoost !== null && karmaBoost !== '' && karmaBoost !== undefined) {
      systems.currentSaveGame.playerKarma += this.parseChoiceBoost(karmaBoost);
    }

    if (intellectBoost !== null && intellectBoost !== '' && intellectBoost !== undefined) {
      systems.currentSaveGame.playerIntellect += this.parseChoiceBoost(intellectBoost);
    }

    if (loveBoost !== null && loveBoost !== '' && loveBoost !== undefined) {
      systems.currentSaveGame.playerLove += this.parseChoiceBoost(loveBoost);
    }

    if (powerBoost !== null && powerBoost !== '' && powerBoost !== undefined) {
      systems.currentSaveGame.playerPower += this.parseChoiceBoost(powerBoost);
    }

    if (darkTetradBoost !== null && darkTetradBoost !== '' && darkTetradBoost !== undefined) {
      systems.currentSaveGame.playerDarkTetrad += this.parseChoiceBoost(darkTetradBoost);
    }

    if (additionalVariableBoostA_Key !== null && additionalVariableBoostA_Key !== '' && additionalVariableBoostA_Key !== undefined) {
      systems.currentSaveGame.writeToGameVariables(additionalVariableBoostA_Key, additionalVariableBoostA_Value);

      if (additionalVariableBoostB_Key !== null && additionalVariableBoostB_Key !== '' && additionalVariableBoostB_Key !== undefined) {
        systems.currentSaveGame.writeToGameVariables(additionalVariableBoostB_Key, additionalVariableBoostB_Value);
      }
    }
  }

  loadStoryNode(destination) {
    var textPrint;

    if (destination === 'DEATH') {
      textPrint = 'DEATH';
      storyText.setText(textPrint);
      storyText.y = frame01YPos;
      this.fadeInText();

      choice1.setText('');
      systems.currentSaveGame.currentNodeKey = 'AA000AA000AA';
      this.game.time.events.add(1500, function () {
        this.game.state.start('Menu');
      }, this);
    } else if (destination === 'END') {
      textPrint = 'END';
      storyText.setText(textPrint);
      storyText.y = frame01YPos;
      this.fadeInText();

      choice1.setText('');
      systems.currentSaveGame.currentNodeKey = 'AA000AA000AA';
      this.game.time.events.add(1500, function () {
        this.game.state.start('Menu');
      }, this);
    } else {
      if (destination.substring(0, 1) !== 'X') {
        systems.currentSaveGame.currentNodeKey = destination;

        textPrint = globals.currentModuleTextMap.get(systems.currentSaveGame.currentNodeKey);
        storyText.setText(textPrint);
        storyText.y = frame01YPos;
        this.fadeInText();

        // storyText.setText('');
        // this.loadStoryText();
      } else {
        // link node logic - loop through as many link nodes as necessary
        var tempKey = this.processLinkNode(destination);
        var tempDestination = tempKey;

        while (tempKey.substring(0, 1) === 'X') {
          tempKey = this.processLinkNode(tempDestination);
          tempDestination = tempKey;
        }

        systems.currentSaveGame.currentNodeKey = tempDestination;

        textPrint = globals.currentModuleTextMap.get(systems.currentSaveGame.currentNodeKey);
        storyText.setText(textPrint);
        storyText.y = frame01YPos;
        this.fadeInText();
      }
    }

    // kern of duty text
    // storyText.setText('');

    this.loadChoices();
    this.adjustSliders();
  }
  
  processLinkNode(destination) {
    var loadedLinkNodes = [];
    var stringTest;
    var test1 = false;
    var test2 = false;
    var test3 = false;

    // load the link nodes into the temp array
    for (var j in globals.currentModuleLinkNodesData) {
      stringTest = globals.currentModuleLinkNodesData[j].KEY;
      if (stringTest.substring(0, 13) === destination) {
        // loadedLinkNodes.push(i);
        loadedLinkNodes.push(globals.currentModuleLinkNodesData[j]);
      }
    }

    // or make this a while loop?
    for (var i = 0; i < loadedLinkNodes.length; i++) {
      if (loadedLinkNodes[i].variable1 !== 'ELSE') {
        if (loadedLinkNodes[i].variable2 === '' || loadedLinkNodes[i].variable2 === null || loadedLinkNodes[i].variable2 === undefined) {
          // then just check for variable1
          if (this.checkPlayerVariables(loadedLinkNodes[i].variable1, loadedLinkNodes[i].equivalence1, loadedLinkNodes[i].value1)) {
            test1 = true;
          }
        } else if (loadedLinkNodes[i].variable3 === '' || loadedLinkNodes[i].variable3 === null || loadedLinkNodes[i].variable3 === undefined) {
          // check for variable1 and variable2
          if (this.checkPlayerVariables(loadedLinkNodes[i].variable1, loadedLinkNodes[i].equivalence1, loadedLinkNodes[i].value1)) {
            test1 = true;
          }

          if (this.checkPlayerVariables(loadedLinkNodes[i].variable2, loadedLinkNodes[i].equivalence2, loadedLinkNodes[i].value2)) {
            test2 = true;
          }
        } else {
          // check for variable1, variable2, and variable3
          if (this.checkPlayerVariables(loadedLinkNodes[i].variable1, loadedLinkNodes[i].equivalence1, loadedLinkNodes[i].value1)) {
            test1 = true;
          }

          if (this.checkPlayerVariables(loadedLinkNodes[i].variable2, loadedLinkNodes[i].equivalence2, loadedLinkNodes[i].value2)) {
            test2 = true;
          }

          if (this.checkPlayerVariables(loadedLinkNodes[i].variable3, loadedLinkNodes[i].equivalence3, loadedLinkNodes[i].value3)) {
            test3 = true;
          }
        }
        // -------------------------------------------------------------------------
        // Test the individual variables in combination
        // -------------------------------------------------------------------------
        if (loadedLinkNodes[i].operator1 === '' || loadedLinkNodes[i].operator1 === null || loadedLinkNodes[i].operator1 === undefined) {
          if (test1) {
            // go to destination
            return this.getRandomLinkNodeDestination(loadedLinkNodes[i]);
          }
        } else if (loadedLinkNodes[i].operator1 === '&&' && loadedLinkNodes[i].operator2 === '') {
          if (test1 && test2) {
            // go to destination
            return this.getRandomLinkNodeDestination(loadedLinkNodes[i]);
          }
        } else if (loadedLinkNodes[i].operator1 === '||' && loadedLinkNodes[i].operator2 === '') {
          if (test1 || test2) {
            // go to destination
            return this.getRandomLinkNodeDestination(loadedLinkNodes[i]);
          }
        } else if (loadedLinkNodes[i].operator1 === '&&' && loadedLinkNodes[i].operator2 === '&&') {
          if (test1 && test2 && test3) {
            // go to destination
            return this.getRandomLinkNodeDestination(loadedLinkNodes[i]);
          }
        } else if (loadedLinkNodes[i].operator1 === '||' && loadedLinkNodes[i].operator2 === '&&') {
          if ((test1 || test2) && test3) {
            // go to destination
            return this.getRandomLinkNodeDestination(loadedLinkNodes[i]);
          }
        } else if (loadedLinkNodes[i].operator1 === '&&' && loadedLinkNodes[i].operator2 === '||') {
          if ((test1 && test2) || test3) {
            // go to destination
            return this.getRandomLinkNodeDestination(loadedLinkNodes[i]);
          }
        } else if (loadedLinkNodes[i].operator1 === '||' && loadedLinkNodes[i].operator2 === '||') {
          if (test1 || test2 || test3) {
            // go to destination
            return this.getRandomLinkNodeDestination(loadedLinkNodes[i]);
          }
        }
      } else {
        // variable1 is ELSE and just go to destination
        return this.getRandomLinkNodeDestination(loadedLinkNodes[i]);
      }
    }
    // If nothing is found, that's an error
    alert('Something bad happened.');
    return null;
  }

  getRandomLinkNodeDestination(linkNode) {
    var dieRollDestinationA;
    var dieRollDestinationB;
    var dieRollDestinationC;
    var dieRollDestinationD;

    // alert(linkNode.destinationA_percentage);

    if (linkNode.destinationA_percentage === null || linkNode.destinationA_percentage === '' || linkNode.destinationA_percentage === undefined) {
      // There's only one destination, go to destinationA
      return linkNode.destinationA;
    } else if (linkNode.destinationC_percentage === null || linkNode.destinationC_percentage === '' || linkNode.destinationC_percentage === undefined) {
      // There's no third destination, so it's between destinationA and destinationB
      dieRollDestinationA = (Math.floor(Math.random() * 100) + 1) * linkNode.destinationA_percentage;
      dieRollDestinationB = (Math.floor(Math.random() * 100) + 1) * linkNode.destinationB_percentage;

      if (dieRollDestinationA > dieRollDestinationB) {
        // go to destinationA
        return linkNode.destinationA;
      } else {
        // go to destinationB
        return linkNode.destinationB;
      }
    } else if (linkNode.destinationD_percentage === null || linkNode.destinationD_percentage === '') {
      // There's no fourth destination, so it's between destinationA and destinationB and destinationC
      dieRollDestinationA = (Math.floor(Math.random() * 100) + 1) * linkNode.destinationA_percentage;
      dieRollDestinationB = (Math.floor(Math.random() * 100) + 1) * linkNode.destinationB_percentage;
      dieRollDestinationC = (Math.floor(Math.random() * 100) + 1) * linkNode.destinationC_percentage;

      if (dieRollDestinationA > dieRollDestinationB && dieRollDestinationA > dieRollDestinationC) {
        // go to destinationA
        return linkNode.destinationA;
      } else if (dieRollDestinationB > dieRollDestinationC) {
        // go to destinationB
        return linkNode.destinationB;
      } else {
        // go to destinationC
        return linkNode.destinationC;
      }
    } else {
      // There are four destinations
      dieRollDestinationA = (Math.floor(Math.random() * 100) + 1) * linkNode.destinationA_percentage;
      dieRollDestinationB = (Math.floor(Math.random() * 100) + 1) * linkNode.destinationB_percentage;
      dieRollDestinationC = (Math.floor(Math.random() * 100) + 1) * linkNode.destinationC_percentage;
      dieRollDestinationD = (Math.floor(Math.random() * 100) + 1) * linkNode.destinationD_percentage;

      if (dieRollDestinationA > dieRollDestinationB && dieRollDestinationA > dieRollDestinationC && dieRollDestinationA > dieRollDestinationD) {
        // go to destinationA
        return linkNode.destinationA;
      } else if (dieRollDestinationB > dieRollDestinationC && dieRollDestinationB > dieRollDestinationD) {
        // go to destinationB
        return linkNode.destinationB;
      } else if (dieRollDestinationC > dieRollDestinationD) {
        // go to destinationC
        return linkNode.destinationC;
      } else {
        // go to destinationD
        return linkNode.destinationD;
      }
    }
  }
}
