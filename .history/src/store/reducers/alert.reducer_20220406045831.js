import userTypes from '../actions/types';

const initialState = {
  text: '',
  color: '',
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_ALERT:
      return action.alertMessage;

    case userTypes.RESET_ALERT:
      return initialState;

    default:
      return state;
  }
};

export default alertReducer;
