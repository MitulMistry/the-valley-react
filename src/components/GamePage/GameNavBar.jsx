import React from 'react';

import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class GameNavBar extends React.Component {
  render() {
    return (
      <Navbar expand="lg" variant="dark">
        <Container className="game-nav-container">
          <Link to="/" className="navbar-brand">The Valley</Link>
          <Nav>
            <Link to="/">Menu</Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}