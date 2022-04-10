// import userTypes from '../actions/types';
import * as types from '../actions/types';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNIN_USER:
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
      };

    case types.SIGNIN_FAIL:
      return { ...state, isLoggedIn: false, user: null, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
