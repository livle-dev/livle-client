// Libraries
import { connect } from 'react-redux';
// Views
import GoPage from '../../views/home/GoPage';

const mapStateToProps = state => {
  return {
    reservation: state.reservation,
  };
};

export default connect(mapStateToProps)(GoPage);
