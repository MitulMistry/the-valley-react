import { connect } from 'react-redux';
import { GamePage } from './GamePage';

// Actions
import { resetTextUpdate } from '../../actions/textActions';

const mapStateToProps = state => ({
  text: state.text.text,
  choices: state.text.choices,
  textWasUpdated: state.text.textWasUpdated
});

const mapDispatchToProps = dispatch => ({
  resetTextUpdate: () => dispatch(resetTextUpdate())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
