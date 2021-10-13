import { connect } from 'react-redux';
import { GamePage } from './GamePage';

// Actions

const mapStateToProps = state => ({
  text: state.text.text,
  choices: state.text.choices
});

// const mapDispatchToProps = dispatch => ({

// });

export default connect(
  mapStateToProps
)(GamePage);
