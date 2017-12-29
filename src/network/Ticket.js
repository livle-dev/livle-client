import axios from './axios';
import { getTime, getDday, isFuture } from '../assets/functions';
import {
  AppAction,
  TicketAction,
  MainAction,
  ModalAction,
  MessageBarAction,
} from '../reducers/Actions';
import { main_string } from '../assets/strings';

export const getAllTicket = dispatch => {
  return axios
    .get(`/ticket`)
    .then(res => {
      const sortData = res.data.sort(
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
        type: TicketAction.UPDATE_TICKET,
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
    .catch(err => console.log(err.response));
};

export const canReserveTicket = (auth, data) => dispatch => {
  const {
    free_trial_started_at,
    cancelled_at,
    suspended_by,
    valid_by,
  } = auth.data;

  if (valid_by) {
    // 구독한 정보가 있음
    if (isFuture(valid_by, data.start_at)) {
      // 구독만료일이 공연일 이후
      if (!suspended_by || !isFuture(suspended_by)) {
        // 패널티가 없거나 끝남
        if (data.capacity > 0) {
          // 예약 가능한 자리가 있음
          return reserveTicket(data.id)(dispatch);
        } else {
          // 예약 가능한 자리가 없음
          console.log('좌석이 매진되었습니다.');
        }
      } else {
        // 패널티 진행중
        console.log('패널티에 걸려있어 예약할 수 없습니다.');
      }
    } else {
      // 구독만료일이 공연일 이전
      if (!cancelled_at || isFuture(cancelled_at, data.start_at)) {
        // 구독취소를 하지 않았거나 구독취소일이 공연일 이후
        if (!suspended_by || !isFuture(suspended_by)) {
          // 패널티가 없거나 끝남
          if (data.capacity > 0) {
            // 예약 가능한 자리가 있음
            return reserveTicket(data.id)(dispatch);
          } else {
            // 예약 가능한 자리가 없음
            console.log('좌석이 매진되었습니다.');
          }
        } else {
          // 패널티 진행중
          console.log('패널티에 걸려있어 예약할 수 없습니다.');
        }
      } else {
        // 구독취소일이 공연일 이전
        console.log('구독을 재개하여 콘서트를 즐기세요.');
      }
    }
  } else {
    // 구독한 정보가 없음
    if (!free_trial_started_at) {
      // free trial을 한 적이 없음
      dispatch({ type: AppAction.PROMOTION });
    } else {
      // free trial을 한 적이 있음
      console.log('구독 후에 예약할 수 있습니다.');
    }
  }
  return false;
};

export const getReserveTicket = dispatch => {
  return axios
    .get(`/reservation`)
    .then(response => {
      const { data } = response;
      dispatch({
        type: TicketAction.UPDATE_RESERVATION,
        data: data,
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
      const { data } = response;
      dispatch({
        type: TicketAction.ADD_RESERVATION,
        data: data,
      });
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'check',
          text: main_string.concertBooked,
          showLogo: true,
        },
      });
      return Promise.resolve(true);
    })
    .catch(err => {
      console.log(err.response);
      return Promise.resolve(false);
    });
};

export const cancelTicket = id => dispatch => {
  return axios
    .delete(`/reservation/${id}`)
    .then(response => {
      dispatch({
        type: TicketAction.CANCEL_RESERVATION,
        id: id,
      });
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'check',
          text: main_string.cancelReservation,
          showLogo: true,
        },
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const checkIn = (id, code) => dispatch => {
  return axios
    .post(`/reservation/${id}/check`, { code: code })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err.response);
    });
};
