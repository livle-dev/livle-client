// Libraries
import { connect } from 'react-redux';
import { ReservationAction, MessageBarAction } from '../../../reducers/Actions';
// Views
import GoPage from '../../views/home/GoPage';

const mapStateToProps = state => {
  return {
    reservation: state.reservation,
  };
};

export default connect(mapStateToProps)(GoPage);
