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
    // this.loadChoices();
  }

  static loadText() {
    const key = store.getState().game.currentNodeKey;
    const text = store.getState().data.textData[key];
    store.dispatch(setText(text));
  }

  loadChoices() {
    this.updateDebug(); // update debug items if debug mode is enabled

    var stringTest;
    loadedChoices.length = 0; // Clear the array
    choicesColorArray.length = 0;

    // Reset choice colors to white
    choice1.fill = choiceColor;
    choice2.fill = choiceColor;
    choice3.fill = choiceColor;
    choice4.fill = choiceColor;
    choice5.fill = choiceColor;

    for (var i in globals.currentModuleChoicesData) {
      stringTest = globals.currentModuleChoicesData[i].KEY;
      if (stringTest.substring(0, 12) === systems.currentSaveGame.currentNodeKey) {
        if (this.checkChoice(i)) {
          loadedChoices.push(i);
        }
      }
    }

    choicesTextGroup.y = 0; // reset y position of the text group

    if (loadedChoices.length === 1) {
      choice1.setText(continueText);
      choice1.y = frame02YPos;
      choicesColorArray.push(choice1.fill);
      this.fadeInChoice(choice1, textFadeInLength);
      choice2.setText('');
      choice3.setText('');
      choice4.setText('');
      choice5.setText('');
      choicesHeight = choice1.height;
    } else if (loadedChoices.length === 2) {
      choice1.setText(globals.currentModuleChoicesData[loadedChoices[0]].text);
      choice1.y = frame02YPos;
      choicesColorArray.push(choice1.fill);
      this.fadeInChoice(choice1, textFadeInLength);
      choice2.setText(globals.currentModuleChoicesData[loadedChoices[1]].text);
      choice2.y = frame02YPos + choice1.height + choicesSpacer;
      choicesColorArray.push(choice2.fill);
      this.fadeInChoice(choice2, textFadeInLength + choicesFadeInLength);
      choice3.setText('');
      choice4.setText('');
      choice5.setText('');
      choicesHeight = choice1.height + choice2.height + choicesSpacer;
    } else if (loadedChoices.length === 3) {
      choice1.setText(globals.currentModuleChoicesData[loadedChoices[0]].text);
      choice1.y = frame02YPos;
      this.fadeInChoice(choice1, textFadeInLength);
      choicesColorArray.push(choice1.fill);
      choice2.setText(globals.currentModuleChoicesData[loadedChoices[1]].text);
      choice2.y = frame02YPos + choice1.height + choicesSpacer;
      choicesColorArray.push(choice2.fill);
      this.fadeInChoice(choice2, textFadeInLength + choicesFadeInLength);
      choice3.setText(globals.currentModuleChoicesData[loadedChoices[2]].text);
      choice3.y = frame02YPos + choice1.height + choice2.height + (choicesSpacer * 2);
      choice3.fill = this.checkChoiceColor(loadedChoices[2]);
      choicesColorArray.push(choice3.fill);
      this.fadeInChoice(choice3, textFadeInLength + (2 * choicesFadeInLength));
      choice4.setText('');
      choice5.setText('');
      choicesHeight = choice1.height + choice2.height + choice3.height + (choicesSpacer * 2);
    } else if (loadedChoices.length === 4) {
      choice1.setText(globals.currentModuleChoicesData[loadedChoices[0]].text);
      choice1.y = frame02YPos;
      choicesColorArray.push(choice1.fill);
      this.fadeInChoice(choice1, textFadeInLength);
      choice2.setText(globals.currentModuleChoicesData[loadedChoices[1]].text);
      choice2.y = frame02YPos + choice1.height + choicesSpacer;
      choicesColorArray.push(choice2.fill);
      this.fadeInChoice(choice2, textFadeInLength + choicesFadeInLength);
      choice3.setText(globals.currentModuleChoicesData[loadedChoices[2]].text);
      choice3.y = frame02YPos + choice1.height + choice2.height + (choicesSpacer * 2);
      choice3.fill = this.checkChoiceColor(loadedChoices[2]);
      choicesColorArray.push(choice3.fill);
      this.fadeInChoice(choice3, textFadeInLength + (2 * choicesFadeInLength));
      choice4.setText(globals.currentModuleChoicesData[loadedChoices[3]].text);
      choice4.y = frame02YPos + choice1.height + choice2.height + choice3.height + (choicesSpacer * 3);
      choice4.fill = this.checkChoiceColor(loadedChoices[3]);
      choicesColorArray.push(choice4.fill);
      this.fadeInChoice(choice4, textFadeInLength + (3 * choicesFadeInLength));
      choice5.setText('');
      choicesHeight = choice1.height + choice2.height + choice3.height + choice4.height + (choicesSpacer * 3);
    } else if (loadedChoices.length === 5) {
      choice1.setText(globals.currentModuleChoicesData[loadedChoices[0]].text);
      choice1.y = frame02YPos;
      choicesColorArray.push(choice1.fill);
      this.fadeInChoice(choice1, textFadeInLength);
      choice2.setText(globals.currentModuleChoicesData[loadedChoices[1]].text);
      choice2.y = frame02YPos + choice1.height + choicesSpacer;
      choicesColorArray.push(choice2.fill);
      this.fadeInChoice(choice2, textFadeInLength + choicesFadeInLength);
      choice3.setText(globals.currentModuleChoicesData[loadedChoices[2]].text);
      choice3.y = frame02YPos + choice1.height + choice2.height + (choicesSpacer * 2);
      choice3.fill = this.checkChoiceColor(loadedChoices[2]);
      choicesColorArray.push(choice3.fill);
      this.fadeInChoice(choice3, textFadeInLength + (2 * choicesFadeInLength));
      choice4.setText(globals.currentModuleChoicesData[loadedChoices[3]].text);
      choice4.y = frame02YPos + choice1.height + choice2.height + choice3.height + (choicesSpacer * 3);
      choice4.fill = this.checkChoiceColor(loadedChoices[3]);
      choicesColorArray.push(choice4.fill);
      this.fadeInChoice(choice4, textFadeInLength + (3 * choicesFadeInLength));
      choice5.setText(globals.currentModuleChoicesData[loadedChoices[4]].text);
      choice5.y = frame02YPos + choice1.height + choice2.height + choice3.height + +choice4.height + (choicesSpacer * 4);
      choice5.fill = this.checkChoiceColor(loadedChoices[4]);
      choicesColorArray.push(choice5.fill);
      this.fadeInChoice(choice5, textFadeInLength + (4 * choicesFadeInLength));
      choicesHeight = choice1.height + choice2.height + choice3.height + choice4.height + choice5.height + (choicesSpacer * 4);
    } else {
      // error
      alert('ERROR: loadedChoices.length is out of bounds');
    }
  }

  checkChoice(choiceArrayKey) {
    if (globals.currentModuleChoicesData[choiceArrayKey].karmaCost !== '' && globals.currentModuleChoicesData[choiceArrayKey].karmaCost !== null && globals.currentModuleChoicesData[choiceArrayKey].karmaCost !== undefined) {
      if (systems.currentSaveGame.playerKarma >= this.parseChoiceCost(globals.currentModuleChoicesData[choiceArrayKey].karmaCost)) {
        return true;
      } else {
        return false;
      }
    } else if (globals.currentModuleChoicesData[choiceArrayKey].powerCost !== '' && globals.currentModuleChoicesData[choiceArrayKey].powerCost !== null && globals.currentModuleChoicesData[choiceArrayKey].powerCost !== undefined) {
      if (systems.currentSaveGame.playerPower >= this.parseChoiceCost(globals.currentModuleChoicesData[choiceArrayKey].powerCost)) {
        return true;
      } else {
        return false;
      }
    } else if (globals.currentModuleChoicesData[choiceArrayKey].intellectCost !== '' && globals.currentModuleChoicesData[choiceArrayKey].intellectCost !== null && globals.currentModuleChoicesData[choiceArrayKey].intellectCost !== undefined) {
      if (systems.currentSaveGame.playerIntellect >= this.parseChoiceCost(globals.currentModuleChoicesData[choiceArrayKey].intellectCost)) {
        return true;
      } else {
        return false;
      }
    } else if (globals.currentModuleChoicesData[choiceArrayKey].loveCost !== '' && globals.currentModuleChoicesData[choiceArrayKey].loveCost !== null && globals.currentModuleChoicesData[choiceArrayKey].loveCost !== undefined) {
      if (systems.currentSaveGame.playerLove >= this.parseChoiceCost(globals.currentModuleChoicesData[choiceArrayKey].loveCost)) {
        return true;
      } else {
        return false;
      }
    } else if (globals.currentModuleChoicesData[choiceArrayKey].darkTetradCost !== '' && globals.currentModuleChoicesData[choiceArrayKey].darkTetradCost !== null && globals.currentModuleChoicesData[choiceArrayKey].darkTetradCost !== undefined) {
      if (systems.currentSaveGame.playerDarkTetrad >= this.parseChoiceCost(globals.currentModuleChoicesData[choiceArrayKey].powerDarkTetrad)) {
        return true;
      } else {
        return false;
      }
    } else if (globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Key !== '' && globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Key !== null && globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Key !== undefined) { // CHECK FOR ADDITIONAL VARIABLES
      if (globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostB_Key !== '' && globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostB_Key !== null && globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostB_Key !== undefined) {
        // There are two additional variable costs
        if (globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCost_Operator === '&&') {
          if (systems.currentSaveGame.checkGameVariables(globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Key, globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Equivalence, globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Value) && systems.currentSaveGame.checkGameVariables(globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostB_Key, globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostB_Equivalence, globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostB_Value)) {
            return true;
          } else {
            return false;
          }
        } else if (globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCost_Operator === '||') {
          if (systems.currentSaveGame.checkGameVariables(globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Key, globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Equivalence, globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Value) || systems.currentSaveGame.checkGameVariables(globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostB_Key, globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostB_Equivalence, globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostB_Value)) {
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
        if (systems.currentSaveGame.checkGameVariables(globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Key, globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Equivalence, globals.currentModuleChoicesData[choiceArrayKey].additionalVariableCostA_Value)) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      // there are no costs for this choice, so return true
      return true;
    }
  }

  checkChoiceColor(choiceArrayKey) {
    // returns what color the text should be
    if (globals.currentModuleChoicesData[choiceArrayKey].karmaCost !== '') {
      return fontColorKarma;
    } else if (globals.currentModuleChoicesData[choiceArrayKey].powerCost !== '') {
      return fontColorPower;
    } else if (globals.currentModuleChoicesData[choiceArrayKey].intellectCost !== '') {
      return fontColorIntellect;
    } else if (globals.currentModuleChoicesData[choiceArrayKey].loveCost !== '') {
      return fontColorLove;
    } else if (globals.currentModuleChoicesData[choiceArrayKey].darkTetradCost !== '') {
      return fontColorDarkTetrad;
    } else {
      return choiceColor;
    }
  }

  parseChoiceCost(stringToParse) {
    if (stringToParse === 'mini01') {
      return constants.POINT_COST_MINI_01;
    } else if (stringToParse === 'mini02') {
      return constants.POINT_COST_MINI_02;
    } else if (stringToParse === 'mini03') {
      return constants.POINT_COST_MINI_03;
    } else if (stringToParse === 'moderate01') {
      return constants.POINT_COST_MODERATE_01;
    } else if (stringToParse === 'moderate02') {
      return constants.POINT_COST_MODERATE_02;
    } else if (stringToParse === 'moderate03') {
      return constants.POINT_COST_MODERATE_03;
    } else if (stringToParse === 'heavy01') {
      return constants.POINT_COST_HEAVY_01;
    } else if (stringToParse === 'heavy02') {
      return constants.POINT_COST_HEAVY_02;
    } else if (stringToParse === 'heavy03') {
      return constants.POINT_COST_HEAVY_03;
    } else if (stringToParse === 'mega01') {
      return constants.POINT_COST_MEGA_01;
    } else if (stringToParse === 'mega02') {
      return constants.POINT_COST_MEGA_02;
    } else if (stringToParse === 'mega03') {
      return constants.POINT_COST_MEGA_03;
    } else {
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

  makeDecision(choiceNumber) {
    systems.currentSaveGame.writeToGameLog(systems.currentSaveGame.currentNodeKey, choiceNumber);

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
          if (systems.currentSaveGame.checkGameVariables(loadedLinkNodes[i].variable1, loadedLinkNodes[i].equivalence1, loadedLinkNodes[i].value1)) {
            test1 = true;
          }
        } else if (loadedLinkNodes[i].variable3 === '' || loadedLinkNodes[i].variable3 === null || loadedLinkNodes[i].variable3 === undefined) {
          // check for variable1 and variable2
          if (systems.currentSaveGame.checkGameVariables(loadedLinkNodes[i].variable1, loadedLinkNodes[i].equivalence1, loadedLinkNodes[i].value1)) {
            test1 = true;
          }

          if (systems.currentSaveGame.checkGameVariables(loadedLinkNodes[i].variable2, loadedLinkNodes[i].equivalence2, loadedLinkNodes[i].value2)) {
            test2 = true;
          }
        } else {
          // check for variable1, variable2, and variable3
          if (systems.currentSaveGame.checkGameVariables(loadedLinkNodes[i].variable1, loadedLinkNodes[i].equivalence1, loadedLinkNodes[i].value1)) {
            test1 = true;
          }

          if (systems.currentSaveGame.checkGameVariables(loadedLinkNodes[i].variable2, loadedLinkNodes[i].equivalence2, loadedLinkNodes[i].value2)) {
            test2 = true;
          }

          if (systems.currentSaveGame.checkGameVariables(loadedLinkNodes[i].variable3, loadedLinkNodes[i].equivalence3, loadedLinkNodes[i].value3)) {
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
