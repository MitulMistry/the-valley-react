import React from 'react';

import { MenuList } from './MenuList';

export class MenuPage extends React.Component {
  render() {
    return (
      <div className="menu-page">
        <h1 className="menu-title">The Valley</h1>
        <h4 className="menu-tagline">A text adventure system built with React.</h4>
        <div className="d-flex justify-content-center">
          <p className="menu-info">Start life as an ancient tribesman and lead your people to greatness... or fall and be erased by the annals of time.</p>
        </div>
        <MenuList />
      </div>
    );
  }
}