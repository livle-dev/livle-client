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
        item.reservation_id = null;
      });
      return {
        ...state,
        ticket: { data: updateData, dataIndex: action.dataIndex },
      };
    }
    case TicketAction.SET_RESERVATION: {
      /**
       * action.data = PropTypes.object.isRequired
       **/
      const updateTicket = state.ticket;
      const updateData = action.data;
      updateData.forEach(item => {
        let ticket = updateTicket.data.find(
          ticket => ticket.id === item.ticket_id
        );
        ticket.reservation_id = item.id;
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
        ticket => ticket.id === updateData.ticket_id
      );
      ticket.reservation_id = updateData.id;
      addTicketData(updateData, ticket);
      updateData.checked_at = null;
      updateData.cancelled_at = null;

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
      updateTicket.data.forEach(item => {
        if (item.reservation_id === action.id) item.reservation_id = null;
      });

      return { ticket: updateTicket, reservation: prunedList };
    }
    case TicketAction.UPDATE_RESERVATION: {
      /**
       * action.data = PropTypes.object.isRequired
       **/
      const updateReservation = state.reservation;
      let reservation = updateReservation.find(
        item => item.id === action.data.id
      );
      reservation.checked_at = action.data.checked_at;
      return { ...state, reservation: updateReservation };
    }
    default:
      return state;
  }
}

const addTicketData = (reservation, ticket) => {
  reservation.ticket_data = {
    title: ticket.title,
    artists: ticket.artists,
    start_at: ticket.start_at,
    end_at: ticket.end_at,
    image: ticket.image,
    place: ticket.place,
  };
};
