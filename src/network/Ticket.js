import axios from './axios';
import {
  getTime,
  getDday,
  isFuture,
  status,
  isConcertToday,
} from '../assets/functions';
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
        (x, y) => getTime(x.startAt).timestamp - getTime(y.startAt).timestamp
      );
      return sortData;
    })
    .then(data => {
      let dataIndex = []; //card_index, calendar_index의 관계
      let saveDate;
      data.map((item, index) => {
        const getDate = getTime(item.startAt).date;
        const data_index = dataIndex.length - 1;
        if (!saveDate || saveDate !== getDate) {
          saveDate = getDate;
          dataIndex.push({
            calendar_index: getDday(item.startAt),
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

      return Promise.resolve();
    })
    .then(() => getReserveTicket(dispatch))
    .catch(err => {
      const { status } = err.response;
      return Promise.reject(status);
    });
};

export const canReserveTicket = (auth, data) => dispatch => {
  const { currentSubscription, nextSubscription } = auth.data;
  dispatch({ type: LoadingAction.SHOW_LOADING });
  switch (auth.data.status) {
    case status.BASIC:
    case status.FREE_TRIAL:
      if (isFuture(currentSubscription.to, data.startAt)) {
        return checkTicket(currentSubscription, data)(dispatch);
      } else {
        return checkTicket(nextSubscription, data)(dispatch);
      }
    case status.WILL_TERMINATE:
      return checkTicket(currentSubscription, data)(dispatch);
    case status.NEW:
      dispatch({ type: AppAction.PROMOTION });
      break;
    case status.UNSUBSCRIBING:
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'select',
          text: ticket_string.restoreMembership,
          buttonText: global_string.subscribe,
          onPress: () => dispatch({ type: AppAction.SUBSCRIBE }),
        },
      });
      break;
    case status.SUSPENDED:
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'alert',
          text: `${ticket_string.penaltyFront}
${getTime(auth.data.suspendedBy).timestamp.format(ticket_string.penaltyTime)} ${
            ticket_string.penaltyBack
          }`,
        },
      });
      break;
  }
  dispatch({ type: LoadingAction.HIDE_LOADING });
};

const checkTicket = (subscription, data) => dispatch => {
  dispatch({ type: LoadingAction.HIDE_LOADING });
  if (subscription.used < 2) {
    if (data.vacancies > 0) {
      if (isConcertToday(data)) {
        dispatch({
          type: ModalAction.SHOW_MODAL,
          data: {
            type: 'select',
            text:
              '공연시작 4시간 전부터는 예약을 취소할 수 없습니다. 예약하시겠습니까?',
            onPress: () => reserveTicket(data.id)(dispatch),
          },
        });
      } else {
        reserveTicket(data.id)(dispatch);
      }
    } else {
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: { type: 'alert', text: ticket_string.fullCapacity },
      });
    }
  } else {
    dispatch({
      type: ModalAction.SHOW_MODAL,
      data: {
        type: 'alert',
        text: '구독기간 중 2번 까지만 예약이 가능합니다',
      },
    });
  }
};

const reserveTicket = id => dispatch => {
  dispatch({ type: LoadingAction.SHOW_LOADING });
  return axios
    .post(`/ticket/${id}/reserve`)
    .then(response => {
      dispatch({
        type: TicketAction.ADD_RESERVATION,
        data: response.data,
      });
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'alert',
          text: ticket_string.addReservation,
        },
      });
      return Promise.resolve();
    })
    .catch(err => {
      const { status } = err.response;
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'alert',
          text: `${global_string.errorOccured}
ERROR ${status}`,
        },
      });
      return Promise.reject(status);
    });
};

const getReserveTicket = dispatch => {
  return axios
    .get(`/reservation`)
    .then(response => {
      dispatch({
        type: TicketAction.SET_RESERVATION,
        data: response.data,
      });
    })
    .catch(err => {
      return Promise.reject(err.response.status);
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
        },
      });
      return Promise.resolve();
    })
    .catch(err => {
      const { status } = err.response;
      dispatch({ type: LoadingAction.HIDE_LOADING });
      switch (status) {
        case 403:
          dispatch({
            type: ModalAction.SHOW_MODAL,
            data: {
              type: 'alert',
              text: ticket_string.unableCancelReservation,
            },
          });
          break;
        case 405:
          dispatch({
            type: ModalAction.SHOW_MODAL,
            data: {
              type: 'alert',
              text: ticket_string.alreadyCheckedIn,
            },
          });
          break;
      }
      return Promise.reject(status);
    });
};

export const checkCode = (id, code) => dispatch => {
  dispatch({ type: LoadingAction.SHOW_LOADING });
  return axios
    .post(`/reservation/${id}/check`, { code: code })
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
      return Promise.resolve();
    })
    .catch(err => {
      const { status } = err.response;
      dispatch({ type: LoadingAction.HIDE_LOADING });
      switch (status) {
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
      return Promise.reject(status);
    });
};
