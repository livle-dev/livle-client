import { connect } from 'react-redux';
import LoginPage from '../../views/login/LoginPage';

const mapStateToProps = state => {
  return {
    logInError: state.handleError.LOGIN_ERROR,
  };
};

export default connect(mapStateToProps)(LoginPage);
