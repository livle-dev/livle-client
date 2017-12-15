// Navigation
export const AppAction = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};
export const HomeAction = {
  GO: 'NAV_GO',
  MAIN: 'NAV_MAIN',
  SETTING: 'NAV_SETTING',
};
export const MainAction = {
  UPDATE_INDEX: 'UPDATE_INDEX',
};

// Reservation
export const ReservationAction = {
  ADD_RESERVATION: 'ADD_RESERVATION',
  DELETE_RESERVATION: 'DELETE_RESERVATION',
  ENTRY_NUMBER: 'ENTRY_NUMBER',
  CONFIRM_ENTRY: 'CONFIRM_ENTRY',
};

// Tool
export const NavbarAction = {
  DISABLE_NAVBAR: 'DISABLE_NAVBAR',
  ENABLE_NAVBAR: 'ENABLE_NAVBAR',
};
export const MessageBarAction = {
  SHOW_MESSAGE_BAR: 'SHOW_MESSAGE_BAR',
  ANIMATE_ENDED: 'ANIMATE_ENDED',
};
export const ModalAction = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
};
