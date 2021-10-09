import React from 'react';

import { GameChoiceItem } from './GameChoiceItem';

export class GameChoicesList extends React.Component {
  render() {
    return (
      <div className="game-choices-list">
        <p className="game-choices-info">Make a choice:</p>
        <GameChoiceItem />
        <GameChoiceItem />
        <GameChoiceItem />
      </div>
    );
  }
}