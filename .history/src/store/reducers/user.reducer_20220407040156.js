// import userTypes from '../actions/types';
import * as types from '../actions/types'

const initialState = {
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case types.SIGNIN_FAIL:
    default:
      return state;
  }
};

export default userReducer;
