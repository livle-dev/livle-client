import axios from './axios';
import { getTime } from '../assets/functions';

export function getTicket() {
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
    .catch(err => console.log(err));
}
