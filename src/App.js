import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { Provider } from 'react-redux';
import Container from 'react-bootstrap/Container';
import GameLoadingContainer from './components/GamePage/GameLoadingContainer';
import { MenuPage } from './components/MenuPage/MenuPage';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Container className="app">
        <Routes>
          <Route path="/game" element={<GameLoadingContainer />} />
          <Route path="/" element = {<MenuPage />} />
        </Routes>
      </Container>
    </Router>
  </Provider>
);

export default App;
