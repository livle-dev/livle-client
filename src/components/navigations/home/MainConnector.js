// Libraries
import { connect } from 'react-redux';
// Views
import MainPage from '../../views/home/MainPage';

const mapStateToProps = state => {
  return {
    cardIndex: state.navMainCard.cardIndex,
    calendarIndex: state.navMainCard.calendarIndex,
    reservation: state.reservation,
  };
};

export default connect(mapStateToProps)(MainPage);
