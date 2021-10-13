import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Provider } from 'react-redux';
import Container from 'react-bootstrap/Container';
import GamePageContainer from './components/GamePage/GamePageContainer';
import { MenuPage } from './components/MenuPage/MenuPage';
import { Footer } from './components/common/Footer';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Container className="app">
        <Switch>
          <Route path="/game">
            <GamePageContainer />
          </Route>
          <Route path="/">
            <MenuPage />
          </Route>
        </Switch>
        <Footer />
      </Container>
    </Router>
  </Provider>
);

export default App;
