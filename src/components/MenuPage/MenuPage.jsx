import React from 'react';

import { MenuList } from './MenuList';

export class MenuPage extends React.Component {
  render() {
    return (
      <div className="menu-page">
        <h1>The Valley</h1>
        <h4>A text adventure system built with React.</h4>
        <p className="italic">Start life as an ancient tribesman and lead your people to greatness... or fall and be erased by the annals of time.</p>
      
        <MenuList />
      </div>
    );
  }
}