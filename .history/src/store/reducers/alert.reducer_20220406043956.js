import userTypes from '../actions/types';

const initialState = {
  text: '',
  color: ''
}

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_ALERT:
          return action.msg

      case RESET_ALERT:
          return initialState

      default:
          return state
  }
}