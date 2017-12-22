// Libraries
import { connect } from 'react-redux';
// Views
import MainPage from '../../views/home/MainPage';

const mapStateToProps = state => {
  return {
    storeInfo: state.navMainCard,
    reservation: state.reservation,
  };
};

export default connect(mapStateToProps)(MainPage);
