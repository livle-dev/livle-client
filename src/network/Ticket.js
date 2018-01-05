import axios from './axios';
import { getTime, getDday, isFuture } from '../assets/functions';
import {
  AppAction,
  TicketAction,
  MainAction,
  LoadingAction,
  ModalAction,
  MessageBarAction,
} from '../reducers/Actions';
import { global_string, ticket_string } from '../assets/strings';

export const getAllTicket = dispatch => {
  return axios
    .get(`/ticket`)
    .then(response => {
      const sortData = response.data.sort(
        (x, y) => getTime(x.start_at).timestamp - getTime(y.start_at).timestamp
      );
      return sortData;
    })
    .then(data => {
      let dataIndex = []; //card_index, calendar_index의 관계
      let saveDate;
      data.map((item, index) => {
        const getDate = getTime(item.start_at).date;
        const data_index = dataIndex.length - 1;
        if (!saveDate || saveDate !== getDate) {
          saveDate = getDate;
          dataIndex.push({
            calendar_index: getDday(item.start_at),
            card_start: index,
            card_end: index,
          });
        } else {
          dataIndex[data_index].card_end = index;
        }
      });

      dispatch({
        type: TicketAction.SET_TICKET,
        data: data,
        dataIndex: dataIndex,
      });
      dispatch({
        type: MainAction.UPDATE_INDEX,
        cardIndex: dataIndex[0].card_start,
        calendarIndex: dataIndex[0].calendar_index,
      });

      return Promise.resolve(dispatch);
    })
    .then(dispatch => getReserveTicket(dispatch))
    .catch(err => {
      console.log(err.response);
      return Promise.reject(err.response.status);
    });
};

export const canReserveTicket = (auth, data) => dispatch => {
  const isVaildNow = isFuture(auth.data.valid_by, data.start_at);
  const isCancelled = auth.data.cancelled_at;
  const isSuspendEnd =
    !auth.data.suspended_by || !isFuture(auth.data.suspended_by);
  const isCapable = data.capacity > 0;
  const didFreeTrial = auth.data.free_trial_started_at;

  let error;

  dispatch({ type: LoadingAction.SHOW_LOADING });
  if (auth.data.valid_by)
    if (isVaildNow)
      if (isSuspendEnd)
        if (isCapable) return reserveTicket(data.id)(dispatch);
        else error = 'full_capacity';
      else error = 'suspended';
    else if (!isCancelled)
      if (isSuspendEnd)
        if (isCapable) return reserveTicket(data.id)(dispatch);
        else error = 'full_capacity';
      else error = 'suspended';
    else error = 're_subscribe';
  else if (!didFreeTrial) error = 'start_subscribe';
  else error = 're_subscribe';
  dispatch({ type: LoadingAction.HIDE_LOADING });

  switch (error) {
    case 'full_capacity':
      return dispatch({
        type: ModalAction.SHOW_MODAL,
        data: { type: 'alert', text: ticket_string.fullCapacity },
      });
    case 'suspended':
      return dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'alert',
          text: `${ticket_string.penaltyFront}
${getTime(auth.data.suspended_by).timestamp.format(
            ticket_string.penaltyTime
          )} ${ticket_string.penaltyBack}`,
        },
      });
    case 'start_subscribe':
      return dispatch({ type: AppAction.PROMOTION });
    case 're_subscribe':
      return dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'select',
          text: ticket_string.reApplyMembership,
          buttonText: global_string.subscribe,
          onPress: () => dispatch({ type: AppAction.SUBSCRIBE }),
        },
      });
  }
};

export const getReserveTicket = dispatch => {
  return axios
    .get(`/reservation`)
    .then(response => {
      dispatch({
        type: TicketAction.SET_RESERVATION,
        data: response.data,
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const reserveTicket = id => dispatch => {
  return axios
    .post(`/ticket/${id}/reserve`)
    .then(response => {
      dispatch({
        type: TicketAction.ADD_RESERVATION,
        data: response.data,
      });
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'alert',
          text: ticket_string.concertBooked,
          showLogo: true,
        },
      });
      return Promise.resolve();
    })
    .then(() => {
      dispatch({ type: LoadingAction.HIDE_LOADING });
    })
    .catch(err => {
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'alert',
          text: `${err.response.status} ${global_string.errorOccured}`,
          showLogo: true,
        },
      });
      return Promise.reject(err.response.data);
    });
};

export const cancelTicket = id => dispatch => {
  dispatch({ type: LoadingAction.SHOW_LOADING });
  return axios
    .delete(`/reservation/${id}`)
    .then(response => {
      dispatch({
        type: TicketAction.CANCEL_RESERVATION,
        id: id,
      });
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'alert',
          text: ticket_string.reservationCanceled,
          showLogo: true,
        },
      });
      return Promise.resolve();
    })
    .catch(err => {
      const { status } = err.response;
      dispatch({ type: LoadingAction.HIDE_LOADING });
      switch (status) {
        case 405:
          return dispatch({
            type: ModalAction.SHOW_MODAL,
            data: {
              type: 'alert',
              text: ticket_string.unableCancelReservation,
              showLogo: true,
            },
          });
      }
      return Promise.reject();
    });
};

export const checkCode = (id, code) => dispatch => {
  dispatch({ type: LoadingAction.SHOW_LOADING });
  return axios
    .post(`/reservation/${id}/alert`, { code: code })
    .then(response => {
      dispatch({
        type: TicketAction.UPDATE_RESERVATION,
        data: response.data,
      });
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        message: ticket_string.entryConfirmed,
      });
    })
    .catch(err => {
      const { response } = err;
      dispatch({ type: LoadingAction.HIDE_LOADING });
      switch (response.status) {
        case 403:
          dispatch({
            type: ModalAction.SHOW_MODAL,
            data: {
              type: 'alert',
              text: ticket_string.invalidCode,
              showLogo: true,
            },
          });
          break;
      }
    });
};
