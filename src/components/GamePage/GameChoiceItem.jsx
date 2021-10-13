import React from 'react';

export class GameChoiceItem extends React.Component {
  render() {
    const { choice } = this.props;

    return (
      <p className="game-choice-item">
        {choice.text}
      </p>
    );
  }
}