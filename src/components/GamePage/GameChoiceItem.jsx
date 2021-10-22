import React from 'react';
import { Link } from 'react-router-dom';
import GameManager from '../../mechanics/GameManager';
import constants from '../../globals/constants';
import { checkIfGameOver } from '../../mechanics/helpers';

export class GameChoiceItem extends React.Component {
  constructor(props) {
    super(props);

    this.makeDecision = this.makeDecision.bind(this);
  }

  makeDecision(e) {
    e.preventDefault();
    const { choice } = this.props;

    GameManager.makeDecision(choice.key);
  }

  render() {
    const { choice } = this.props;
    const cssClasses = `game-choice-item ${choice.colorClass}`;
    const gameOver = checkIfGameOver(choice.key);

    return (
      <p>
        {!gameOver && <a href="/#" className={ cssClasses } onClick={ this.makeDecision }>
          { choice.text || constants.CONTINUE_TEXT }
        </a>}
        {gameOver && <Link className="game-choice-item color-choice" to="/">{constants.END_CHOICE}</Link>}
      </p>
    );
  }
}