import React from 'react';

import { Link } from 'react-router-dom';
import { MenuItem } from './MenuItem';

import constants from '../../globals/constants';

export class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.startNewGame = this.startNewGame.bind(this);
  }

  startNewGame() {
    // Dispatch Redux actions
    const {
      startGame,
      resetTextChoices,
      resetVariables,
      resetPoints,
      loadModuleData,
      setLoading
    } = this.props;
    
    startGame();
    resetTextChoices();
    resetVariables();
    resetPoints();
    setLoading(true);
    loadModuleData(constants.MODULE_ASCENT_OF_MAN);
  }

  render() {
    const { gameStarted, currentNodeKey } = this.props;
    const gameEnded = (currentNodeKey === constants.DEATH_KEY || currentNodeKey === constants.END_KEY);

    return (
      <div className="menu-list">
        <h3><Link to="/game" onClick={ this.startNewGame }>New Game</Link></h3>
        {gameStarted && !gameEnded &&
        <h3><Link to="/game">Resume Game</Link></h3>
        }
      </div>
    );
  }
}