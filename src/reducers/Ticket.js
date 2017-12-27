// Actions
import { TicketAction } from './Actions';

const initialState = {
  ticket: { data: [], dataIndex: [] },
  reservation: [],
};
export function ticket(state = initialState, action) {
  switch (action.type) {
    case TicketAction.UPDATE_TICKET:
      /**
       * action.data = PropTypes.array.isRequired
       * action.dataIndex = PropTypes.array.isRequired
       **/
      return {
        ...state,
        ticket: {
          data: action.data,
          dataIndex: action.dataIndex,
        },
      };
    case TicketAction.UPDATE_RESERVATION:
      /**
       * action.data = PropTypes.object.isRequired
       **/
      const updateList = action.data;
      updateList.map((item, index) => {
        const ticketData = state.ticket.data.find(
          ticket => ticket.id === item.ticket_id
        );
        updateList[index] = {
          ...item,
          code: '',
          ticket_data: {
            title: ticketData.title,
            artists: ticketData.artists,
            start_at: ticketData.start_at,
            end_at: ticketData.end_at,
            image: ticketData.image,
            place: ticketData.place,
          },
        };
      });
      return { ...state, reservation: updateList };
    case TicketAction.ADD_RESERVATION:
      /**
       * action.data = PropTypes.object.isRequired
       **/
      const ticketData = state.ticket.data.find(
        item => item.id === action.data.ticket_id
      );
      return {
        ...state,
        reservation: [
          ...state.reservation,
          {
            ...action.data,
            code: '',
            ticket_data: {
              title: ticketData.title,
              artists: ticketData.artists,
              start_at: ticketData.start_at,
              end_at: ticketData.end_at,
              image: ticketData.image,
              place: ticketData.place,
            },
          },
        ],
      };
    case TicketAction.CANCEL_RESERVATION: {
      /**
       * action.id = PropTypes.number.isRequired
       **/
      const prunedList = state.reservation.filter(
        item => item.id !== action.id
      );
      return { ...state, reservation: prunedList };
    }
    case TicketAction.UPDATE_CODE: {
      /**
       * action.id = PropTypes.number.isRequired
       * action.code = PropTypes.number.isRequired
       **/
      const updateList = [...state.reservation];
      const updateData = updateList.find(data => data.id === action.id);
      updateData.code = action.code;

      return { ...state, reservation: updateList };
    }
    default:
      return state;
  }
}
