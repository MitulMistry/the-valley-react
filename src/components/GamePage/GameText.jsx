import React from 'react';

export class GameText extends React.Component {
  render() {
    const { text } = this.props;
    let displayText = (<p>{text}</p>);

    if (Array.isArray(text)) {
        displayText = text.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        )
      );
    }
    
    return (
      <div className="game-text">
        {displayText}
      </div>
    );
  }
}