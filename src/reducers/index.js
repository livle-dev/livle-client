// Libraries
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Actions
import { NavbarAction, MessageBarAction } from './Actions';
// Reducers
import { auth, handleError } from './Auth';
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
       * action.data = PropTypes.string.isRequired
       **/
      return { show: true, message: action.data };
    case MessageBarAction.ANIMATE_ENDED:
      return { show: false, message: '' };
    default:
      return state;
  }
}

// COMBINE REDUCERS
const Reducer = combineReducers({
  // Auth
  auth: auth,
  handleError: handleError,
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
});

// EXPORT STORE
export default createStore(Reducer, undefined, applyMiddleware(thunk));
