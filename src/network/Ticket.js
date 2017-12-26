import axios from './axios';
import { getTime } from '../assets/functions';
import { ModalAction } from '../reducers/Actions';

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
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'check',
          text: main_string.concertBooked,
          showLogo: true,
        },
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const cancelTicket = id => dispatch => {
  return axios
    .delete(`/reservation/${id}`)
    .then(res => {
      console.log('예약이 취소되었습니다.');
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
