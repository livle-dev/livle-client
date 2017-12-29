// Actions
import { TicketAction } from './Actions';

const initialState = {
  ticket: { data: [], dataIndex: [] },
  reservation: [],
};
export function ticket(state = initialState, action) {
  const updateTicket = state.ticket;
  const updateReservation = state.reservation;
  const updateData = action.data;

  switch (action.type) {
    case TicketAction.UPDATE_TICKET:
      /**
       * action.data = PropTypes.array.isRequired
       * action.dataIndex = PropTypes.array.isRequired
       **/
      updateData.forEach(item => {
        item.reservation_id = null;
      });

      return {
        ...state,
        ticket: { data: updateData, dataIndex: action.dataIndex },
      };
    case TicketAction.UPDATE_RESERVATION:
      /**
       * action.data = PropTypes.object.isRequired
       **/
      updateData.forEach(item => {
        let ticket = updateTicket.data.find(
          ticket => ticket.id === item.ticket_id
        );

        ticket.reservation_id = item.id;
        addTicketData(item, ticket);
      });
      return { ticket: updateTicket, reservation: updateData };
    case TicketAction.ADD_RESERVATION:
      /**
       * action.data = PropTypes.object.isRequired
       **/
      let ticket = updateTicket.data.find(
        ticket => ticket.id === updateData.ticket_id
      );
      ticket.reservation_id = updateData.id;
      updateData.checked_at = null;
      updateData.cancelled_at = null;
      addTicketData(updateData, ticket);

      updateReservation.push(updateData);
      return { ticket: updateTicket, reservation: updateReservation };
    case TicketAction.CANCEL_RESERVATION: {
      /**
       * action.id = PropTypes.number.isRequired
       **/
      const prunedList = updateReservation.filter(
        item => item.id !== action.id
      );
      updateTicket.data.forEach(item => {
        if (item.reservation_id === action.id) {
          item.reservation_id = null;
        }
      });

      return { ticket: updateTicket, reservation: prunedList };
    }
    case TicketAction.UPDATE_CODE: {
      /**
       * action.id = PropTypes.number.isRequired
       * action.code = PropTypes.number.isRequired
       **/
      const updateCode = updateReservation.find(data => data.id === action.id);
      updateCode.code = action.code;
      return { ...state, reservation: updateReservation };
    }
    default:
      return state;
  }
}

const addTicketData = (reservation, ticket) => {
  reservation.code = '';
  reservation.ticket_data = {
    title: ticket.title,
    artists: ticket.artists,
    start_at: ticket.start_at,
    end_at: ticket.end_at,
    image: ticket.image,
    place: ticket.place,
  };
};
