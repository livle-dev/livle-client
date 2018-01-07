// Libraries
import { connect } from 'react-redux';
import { TicketAction } from '../../../reducers/Actions';
// Views
import GoPage from '../../views/home/GoPage';

const mapStateToProps = state => {
  return {
    reservation: state.ticket.reservation,
    auth: state.auth.data,
  };
};

export default connect(mapStateToProps)(GoPage);
