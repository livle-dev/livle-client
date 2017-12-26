// Libraries
import { connect } from 'react-redux';
// Actions
import { MainAction } from '../../../reducers/Actions';
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
