import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Container from 'react-bootstrap/Container';

import { GamePage } from './components/GamePage/GamePage';
import { MenuPage } from './components/MenuPage/MenuPage';
import { Footer } from './components/common/Footer';

import './App.css';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/">
            <MenuPage />
          </Route>
        </Switch>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
