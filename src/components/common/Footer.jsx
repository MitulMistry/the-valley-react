import React from 'react';

export class Footer extends React.Component {
  render() {
    let currentYear = new Date().getFullYear();

    return (
      <div className="footer d-flex justify-content-center">
        <div>
          <p><a href="https://github.com/MitulMistry/the-valley-react">Github repo for this site</a></p>
          <p>&copy; Mitul Mistry { currentYear }</p>
        </div>
      </div>
    );
  }
}