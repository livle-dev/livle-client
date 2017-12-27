// Libraries
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Actions
import { NavbarAction, MessageBarAction, ModalAction } from './Actions';
// Reducers
import { auth } from './Auth';
import { appReducer, homeReducer, navNavbar, navMainCard } from './Navigations';
import { reservation } from './Reservation';

// REDUCERS
function disableNavbar(state = { disable: false }, action) {
  switch (action.type) {
    case NavbarAction.ENABLE_NAVBAR:
      return { disable: false };
    case NavbarAction.DISABLE_NAVBAR:
      return { disable: true };
    default:
      return state;
  }
}

function showMessageBar(state = { show: false, message: '' }, action) {
  switch (action.type) {
    case MessageBarAction.SHOW_MESSAGE_BAR:
      /**
       * action.message = PropTypes.string.isRequired
       **/
      return { show: true, message: action.message };
    case MessageBarAction.ANIMATE_ENDED:
      return { show: false, message: '' };
    default:
      return state;
  }
}

function showModal(state = { show: false, data: null }, action) {
  switch (action.type) {
    case ModalAction.SHOW_MODAL:
      /**
       * action.data = PropTypes.string.isRequired
       * data = {
       *  type: 'check', 'select', 'input', 'notice'
       *  text: PropTypes.string.isRequired,
       *  buttonText: PropTypes.string,
       *  onPress: PropTypes.object,
       *  showLogo: PropTypes.bool,
       * }
       **/
      return { show: true, data: action.data };
    case ModalAction.HIDE_MODAL:
      return { show: false, data: null };
    default:
      return state;
  }
}

// COMBINE REDUCERS
const Reducer = combineReducers({
  // Auth
  auth: auth,
  // Navigation
  appReducer: appReducer,
  homeReducer: homeReducer,
  navNavbar: navNavbar,
  navMainCard: navMainCard,
  // Reservation
  reservation: reservation,
  // Tool
  disableNavbar: disableNavbar,
  showMessageBar: showMessageBar,
  showModal: showModal,
});

// EXPORT STORE
export default createStore(Reducer, undefined, applyMiddleware(thunk));
