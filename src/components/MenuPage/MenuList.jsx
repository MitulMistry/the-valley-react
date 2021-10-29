import React from 'react';

import { Link } from 'react-router-dom';
import { MenuItem } from './MenuItem';

import constants from '../../globals/constants';
import { checkIfGameOver } from '../../mechanics/helpers';

export class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.startNewGame = this.startNewGame.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  startNewGame() {    
    const {
      startGame,
      resetTextChoices,
      resetVariables,
      resetPoints,
    } = this.props;

    // Dispatch Redux actions
    startGame();
    resetTextChoices();
    resetVariables();
    resetPoints();
    
    this.loadData();
  }

  loadData() {
    const {
      textData,
      loadModuleData,
      setLoading
    } = this.props;

    // Check if text data is already loaded - only load if it's not
    if (!(constants.ASCENT_OF_MAN_STARTING_KEY in textData)) {
      // Set loading flag for GameLoadingContainer
      setLoading(true);
      // Dispatch Redux action to load text data
      loadModuleData(constants.MODULE_ASCENT_OF_MAN);
    }
  }

  // Starting a new game should load everything from a default state (using
  // the startNewGame function). Resuming a game shouldn't need to load anything,
  // unless the state has been loaded from browser storage (after a hard page
  // refresh, or going to the page again after closing it). The text data is
  // too large to keep in browser storage, so it must be loaded again. 
  render() {
    const { gameStarted, currentNodeKey } = this.props;
    const gameOver = (checkIfGameOver(currentNodeKey));

    return (
      <div className="menu-list">
        <h3><Link to="/game" onClick={ this.startNewGame }>New Game</Link></h3>
        {gameStarted && !gameOver &&
        <h3><Link to="/game" onClick={ this.loadData }>Resume Game</Link></h3>
        }
      </div>
    );
  }
}