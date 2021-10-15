import { connect } from 'react-redux';
import { GameLoading } from './GameLoading';

const mapStateToProps = state => ({
  loading: state.data.loading,
});

export default connect(
  mapStateToProps
)(GameLoading);
