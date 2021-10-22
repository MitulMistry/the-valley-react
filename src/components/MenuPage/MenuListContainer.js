import { connect } from 'react-redux';
import { MenuList } from './MenuList';

// Actions
import { startGame } from '../../actions/gameLogActions';
import { resetTextChoices } from '../../actions/textActions';
import { resetVariables } from '../../actions/variablesActions';
import { resetPoints } from '../../actions/pointsActions';
import { loadModuleData, setLoading } from '../../actions/dataActions';

const mapStateToProps = state => ({
  gameStarted: state.game.gameStarted,
  currentNodeKey: state.game.currentNodeKey
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame()),
  resetTextChoices: () => dispatch(resetTextChoices()),
  resetVariables: () => dispatch(resetVariables()),
  resetPoints: () => dispatch(resetPoints()),
  loadModuleData: moduleNumber => dispatch(loadModuleData(moduleNumber)),
  setLoading: loading => dispatch(setLoading(loading)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuList);