import React from 'react';

import { Spinner } from 'react-bootstrap';
import GamePageContainer from './GamePageContainer';

export class GameLoading extends React.Component {
  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <div className="loading">
          <Spinner animation="border" variant="light" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )
    }
    else {  
      return (
        <GamePageContainer />
      );
    }
  }
}