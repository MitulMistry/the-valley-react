import React from 'react';

import { GameNavBar } from './GameNavBar';
import { GameText } from './GameText';
import { GameChoicesList } from './GameChoicesList';

export class GamePage extends React.Component {
  render() {
    const { text, choices } = this.props;

    return (
      <div className="game-page">
        <GameNavBar />
        <div className="d-flex justify-content-center">
          <div className="game-text-container">
            <GameText />
            <GameChoicesList />
          </div>
        </div>
      </div>
    );
  }
}