import React from 'react';

import { Link } from 'react-router-dom';
import { MenuItem } from './MenuItem';

export class MenuList extends React.Component {
  constructor(props) {
    super(props);

    this.startNewGame = this.startNewGame.bind(this);
  }

  startNewGame() {
    // Dispatch Redux action
    this.props.startGame();
  }

  render() {
    const { gameStarted } = this.props;

    return (
      <div className="menu-list">
        <h3><Link to="/game" onClick={ this.startNewGame }>New Game</Link></h3>
        {gameStarted &&
        <h3><Link to="/game">Resume Game</Link></h3>
        }
      </div>
    );
  }
}