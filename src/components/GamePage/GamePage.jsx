import React from 'react';

import GameManager from '../../mechanics/GameManager';

import { GameNavBar } from './GameNavBar';
import { GameText } from './GameText';
import { GameChoicesList } from './GameChoicesList';

export class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dispatchSent: false
    };
  }

  componentDidMount() {
    GameManager.loadGame();
  }

  render() {
    const { text,choices, textWasUpdated, resetTextUpdate } = this.props;

    // Add and then remove fade-in CSS class when text was updated
    // This allows text to fade in once a decision is made.
    // A timer is used to reset the textWasUpdated variable in the Redux store
    // so that the fade-in effect can be used again the next time the text changes.
    // The dispatchSent property is used in the component state so the render function
    // doesn't keep sending resetTextUpdate() dispatches to Redux.
    const faderClass = textWasUpdated ? 'game-text-container fade-in' : 'game-text-container';

    if (textWasUpdated && !this.state.dispatchSent) {
      this.setState({dispatchSent: true});

      setTimeout(() => {
        resetTextUpdate();
        this.setState({dispatchSent: false});
      }, 1000)
    }

    return (
      <div className="game-page">
        <GameNavBar />
        <div className="d-flex justify-content-center">
          <div className={faderClass}>
            <GameText text={text} />
            <GameChoicesList choices={choices} />
          </div>
        </div>
      </div>
    );
  }
}