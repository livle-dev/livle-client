import axios from './axios';
import { getTime, isFuture } from '../assets/functions';
import { AppAction, ModalAction, MessageBarAction } from '../reducers/Actions';
import { main_string } from '../assets/strings';

export function getAllTicket() {
  return axios
    .get(`/ticket`)
    .then(res => {
      const sortData = res.data.sort(
        (x, y) => getTime(x.start_at).timestamp - getTime(y.start_at).timestamp
      );
      return sortData;
    })
    .then(data => {
      let dataIndex = []; //cardIndex, dateIndex간 관계를 담아둔 array
      let saveDate;
      data.map((item, index) => {
        const getDate = getTime(item.start_at).date;
        if (!saveDate || saveDate !== getDate) {
          saveDate = getDate;
          dataIndex.push({ cardIndex: index, dateIndex: dataIndex.length });
        }
      });

      return {
        data: data,
        dataIndex: dataIndex,
      };
    })
    .catch(err => console.log(err.response));
}

export const getSingleTicket = id => dispatch => {
  return axios
    .get(`/ticket/${id}/stats`)
    .then(res => res.data)
    .catch(err => {
      // console.log(err.response);
    });
};

export const reserveTicket = id => dispatch => {
  return axios
    .post(`/ticket/${id}/reserve`)
    .then(res => {
      const { data } = res;
      // TODO: dispatch reserve info
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'check',
          text: main_string.concertBooked,
          showLogo: true,
        },
      });
      return true;
    })
    .catch(err => {
      console.log(err.response);
      return false;
    });
};

export const canReserveTicket = (auth, data) => dispatch => {
  const { free_trial_started_at, cancelled_at, suspended_by, valid_by } = auth;

  if (valid_by) {
    // 구독한 정보가 있음
    if (isFuture(valid_by, data.start_at)) {
      // 구독만료일이 공연일 이후
      if (!suspended_by || !isFuture(suspended_by)) {
        // 패널티가 없거나 끝남
        if (data.vacancies > 0) {
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
          if (data.vacancies > 0) {
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

export const cancelTicket = id => dispatch => {
  return axios
    .delete(`/reservation/${id}`)
    .then(res => {
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
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err.response);
    });
};
