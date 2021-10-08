import React from 'react';

import { Link } from 'react-router-dom';
import { MenuItem } from './MenuItem';

export class MenuList extends React.Component {
  render() {
    return (
      <div className="menu-list">
        <h3><Link to="/game">New Game</Link></h3>
        <h3><Link to="/game">Resume Game</Link></h3>
      </div>
    );
  }
}