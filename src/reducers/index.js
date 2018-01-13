// Libraries
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Actions
import {
  NavbarAction,
  LoadingAction,
  MessageBarAction,
  ModalAction,
} from './Actions';
// Reducers
import { appReducer, homeReducer, navNavbar, navMainCard } from './Navigations';
import { notif } from './Notification';
import { auth } from './Session';
import { ticket } from './Ticket';

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

function showLoading(state = { show: false }, action) {
  switch (action.type) {
    case LoadingAction.SHOW_LOADING:
      return { show: true };
    case LoadingAction.HIDE_LOADING:
      return { show: false };
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
    case MessageBarAction.HIDE_MESSAGE_BAR:
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
       *  type: 'alert', 'select', 'input', 'blink'
       *  text: PropTypes.string.isRequired,
       *  buttonText: PropTypes.string,
       *  onPress: PropTypes.func,
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
  // Session
  auth: auth,
  // Navigation
  appReducer: appReducer,
  homeReducer: homeReducer,
  navNavbar: navNavbar,
  navMainCard: navMainCard,
  // Notification
  notif: notif,
  // Ticket
  ticket: ticket,
  // Tool
  disableNavbar: disableNavbar,
  showLoading: showLoading,
  showMessageBar: showMessageBar,
  showModal: showModal,
});

// EXPORT STORE
export default createStore(Reducer, undefined, applyMiddleware(thunk));
