import FCM from 'react-native-fcm';
// Network
import {
  scheduleLocalNotification,
  NotifId,
} from '../network/PushNotification';
// Function
import { getTime, isFuture } from '../assets/functions';
// Actions
import { TicketAction } from './Actions';

const initialState = {
  ticket: { data: [], dataIndex: [] },
  reservation: [],
};
export function ticket(state = initialState, action) {
  switch (action.type) {
    case TicketAction.SET_TICKET: {
      /**
       * action.data = PropTypes.array.isRequired
       * action.dataIndex = PropTypes.array.isRequired
       **/
      const updateData = action.data;
      updateData.forEach(item => {
        item.reservationId = null;
      });
      return {
        ...state,
        ticket: { data: updateData, dataIndex: action.dataIndex },
      };
    }
    case TicketAction.UPDATE_TICKET: {
      /**
       * action.data = PropTypes.object.isRequired
       **/
      const updateTicket = state.ticket;
      const updateData = action.data;
      let ticket = updateTicket.data.find(
        ticket => ticket.id === updateData.id
      );
      ticket.vacancies = updateData.vacancies;
      return { ...state, ticket: updateTicket };
    }
    case TicketAction.SET_RESERVATION: {
      /**
       * action.data = PropTypes.object.isRequired
       **/
      const updateTicket = state.ticket;
      const updateData = action.data;
      updateData.forEach(item => {
        let ticket = updateTicket.data.find(
          ticket => ticket.id === item.ticketId
        );
        ticket.reservationId = item.id;
        addTicketData(item, ticket);
      });
      return { ticket: updateTicket, reservation: updateData };
    }
    case TicketAction.ADD_RESERVATION: {
      /**
       * action.data = PropTypes.object.isRequired
       **/
      const updateTicket = state.ticket;
      const updateData = action.data;
      let ticket = updateTicket.data.find(
        ticket => ticket.id === updateData.ticketId
      );
      ticket.reservationId = updateData.id;
      addTicketData(updateData, ticket);
      updateData.checkedAt = null;
      updateData.cancelledAt = null;

      const fourHourBeforeStart = getTime(ticket.startAt).timestamp.subtract(
        4,
        'hours'
      );
      if (isFuture(fourHourBeforeStart)) {
        scheduleLocalNotification(
          NotifId.RESERVATION,
          updateData.id,
          `티켓리스트에 ${
            ticket.title
          }가 추가되었습니다. 현장에서 티켓을 보여주세요.`,
          fourHourBeforeStart
        );
      }

      return {
        ticket: updateTicket,
        reservation: [...state.reservation, updateData],
      };
    }
    case TicketAction.CANCEL_RESERVATION: {
      /**
       * action.id = PropTypes.number.isRequired
       **/
      const updateTicket = state.ticket;
      const prunedList = state.reservation.filter(
        item => item.id !== action.id
      );
      let ticket = updateTicket.data.find(
        ticket => ticket.reservationId === action.id
      );
      ticket.reservationId = null;

      FCM.getScheduledLocalNotifications().then(notif => console.log(notif));
      return { ticket: updateTicket, reservation: prunedList };
    }
    case TicketAction.UPDATE_RESERVATION: {
      /**
       * action.data = PropTypes.object.isRequired
       **/
      const updateReservation = state.reservation;
      const updateData = action.data;
      let reservation = updateReservation.find(
        item => item.id === updateData.id
      );
      reservation.checkedAt = updateData.checkedAt;
      return { ...state, reservation: updateReservation };
    }
    default:
      return state;
  }
}

const addTicketData = (reservation, ticket) => {
  reservation.ticketData = {
    title: ticket.title,
    artists: ticket.artists,
    startAt: ticket.startAt,
    endAt: ticket.endAt,
    image: ticket.image,
    place: ticket.place,
  };
};
