import React from 'react';
import GameManager from '../../mechanics/GameManager';
import constants from '../../globals/constants';

export class GameChoiceItem extends React.Component {
  constructor(props) {
    super(props);

    this.makeDecision = this.makeDecision.bind(this);
  }

  makeDecision(e) {
    e.preventDefault();

    const { choice } = this.props;
    GameManager.makeDecision(choice.KEY);
  }

  render() {
    const { choice } = this.props;

    const cssClasses = `game-choice-item ${choice.colorClass}`;

    return (
      <a href="/#" className={ cssClasses } onClick={ this.makeDecision }>
        { choice.text || constants.CONTINUE_TEXT }
      </a>
    );
  }
}