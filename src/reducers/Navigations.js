// Libraries
import { NavigationActions } from 'react-navigation';
// Actions
import { AppAction, HomeAction, MainAction } from './Actions';
// Navigations
import { AppScreen } from '../components/navigations/AppNavigation';
import { HomeScreen } from '../components/navigations/home/HomeNavigation';
import { LoginScreen } from '../components/navigations/login/LoginNavigation';

// REDUCERS
const signedInState = AppScreen.router.getStateForAction(
  AppScreen.router.getActionForPathAndParams('Home')
);
const initialState = AppScreen.router.getStateForAction(
  AppScreen.router.getActionForPathAndParams('Login'),
  signedInState
);
export function appReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case AppAction.LOGIN:
      nextState = AppScreen.router.getStateForAction(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
          key: null,
        }),
        state
      );
      break;
    case AppAction.LOGOUT:
      nextState = AppScreen.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      nextState = AppScreen.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}

const initialHomeState = HomeScreen.router.getStateForAction(
  HomeScreen.router.getActionForPathAndParams('Main')
);
export function homeReducer(state = initialHomeState, action) {
  let nextState;
  switch (action.type) {
    case HomeAction.GO:
      nextState = HomeScreen.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Go' }),
        state
      );
      break;
    case HomeAction.MAIN:
      nextState = HomeScreen.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state
      );
      break;
    case HomeAction.SETTING:
      nextState = HomeScreen.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Setting' }),
        state
      );
      break;
    default:
      nextState = HomeScreen.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}

const initialNavbarState = { index: 1 };
export function navNavbar(state = initialNavbarState, action) {
  switch (action.type) {
    case HomeAction.GO:
      return { index: 0 };
    case HomeAction.MAIN:
      return { index: 1 };
    case HomeAction.SETTING:
      return { index: 2 };
    default:
      return state;
  }
}

const initialMainState = { cardIndex: 0, calendarIndex: 0, isFirstItem: true };
export function navMainCard(state = initialMainState, action) {
  switch (action.type) {
    case MainAction.UPDATE_INDEX:
      /**
       * action.cardIndex = PropTypes.number.isRequired
       * action.calendarIndex = PropTypes.number.isRequired
       **/
      return {
        ...state,
        cardIndex: action.cardIndex,
        calendarIndex: action.calendarIndex,
      };
    default:
      return state;
  }
}
