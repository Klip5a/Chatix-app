import userTypes from '../actions/types';

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SIGNIN_SUCCESS:
      return action.user;

    default:
      return state;
  }
};

export default userReducer;
