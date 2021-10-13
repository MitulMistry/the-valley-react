import React from 'react';

export class GameText extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <div className="game-text">
        <p>{text}</p>
      </div>
    );
  }
}