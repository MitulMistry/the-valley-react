import { connect } from 'react-redux';
import { GamePage } from './GamePage';

// Actions

const mapStateToProps = state => ({
  text: state.text,
  choices: state.choices
});

// const mapDispatchToProps = dispatch => ({

// });

export default connect(
  mapStateToProps
)(GamePage);
