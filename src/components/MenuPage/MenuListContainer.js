import { connect } from 'react-redux';
import { MenuList } from './MenuList';

// Actions
import { startGame } from '../../actions/gameLogActions';
import { resetTextChoices } from '../../actions/textActions';
import { resetVariables } from '../../actions/variablesActions';
import { resetPoints } from '../../actions/pointsActions';

const mapStateToProps = state => ({
  gameStarted: state.game.gameStarted
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame()),
  resetTextChoices: () => dispatch(resetTextChoices()),
  resetVariables: () => dispatch (resetVariables()),
  resetPoints: () => dispatch (resetPoints())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuList);