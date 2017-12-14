// Actions
import { ReservationAction } from './Actions';

const initialState = {
  goList: [
    // {
    //   id: number,
    //   code: string,
    //   isConfirmed: bool,
    //   data: object
    // }
  ],
};
export function reservation(state = initialState, action) {
  switch (action.type) {
    case ReservationAction.ADD_RESERVATION:
      /**
       * action.data = PropTypes.object.isRequired
       **/
      return {
        goList: [
          ...state.goList,
          {
            id: action.data.id,
            code: '',
            isConfirmed: false, //initial
            data: action.data,
          },
        ],
      };
    case ReservationAction.DELETE_RESERVATION: {
      /**
       * action.id = PropTypes.number.isRequired
       **/
      const prunedIds = state.goList.filter(item => {
        return item.id !== action.id;
      });

      return { goList: prunedIds };
    }
    case ReservationAction.ENTRY_NUMBER: {
      /**
       * action.id = PropTypes.number.isRequired
       * action.code = PropTypes.number.isRequired
       **/
      const updateList = [...state.goList];
      const updateData = updateList.find(data => data.id === action.id);
      updateData.code = action.code;

      return { goList: updateList };
    }
    case ReservationAction.CONFIRM_ENTRY: {
      /**
       * action.id = PropTypes.number.isRequired
       **/
      const updateList = [...state.goList];
      const updateData = updateList.find(data => data.id === action.id);

      // TODO: axios로 credential code 가져오기
      if (updateData.code) updateData.isConfirmed = true;

      return { goList: updateList };
    }
    default:
      return state;
  }
}
