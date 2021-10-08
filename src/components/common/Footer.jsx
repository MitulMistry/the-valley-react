import React from 'react';

import logo from '../../assets/mm_logo.svg';

export class Footer extends React.Component {
  render() {
    let currentYear = new Date().getFullYear();

    return (
      <div className="footer">
        <img src={logo} className="footer-logo" alt="logo" />
        <p><a href="https://github.com/MitulMistry/the-valley-react">Github repo for this site</a><br />
        &copy; Mitul Mistry { currentYear }</p>
      </div>
    );
  }
}