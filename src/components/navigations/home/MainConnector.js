// Libraries
import { connect } from 'react-redux';
// Actions
import { MainAction, MessageBarAction } from '../../../reducers/Actions';
// Views
import MainPage from '../../views/home/MainPage';

const mapStateToProps = state => {
  return {
    auth: state.auth,
    storeInfo: state.navMainCard,
    reservation: state.reservation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateIndex: (cardIndex, calendarIndex) => {
      dispatch({
        type: MainAction.UPDATE_INDEX,
        cardIndex: cardIndex,
        calendarIndex: calendarIndex,
      });
    },
    showMessageBar: message => {
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        message: message,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
