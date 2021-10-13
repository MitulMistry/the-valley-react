import { connect } from 'react-redux';
import { MenuPage } from './MenuPage';

// Actions
import { startGame } from '../../actions/gameLogActions';

const mapStateToProps = state => ({
  gameStarted: state.game.gameStarted
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuPage);