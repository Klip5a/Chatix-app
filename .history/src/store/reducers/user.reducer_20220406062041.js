import userTypes from '../actions/types';

const initialState = {
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null
      };

    case userTypes.SIGNIN_FAIL:
    default:
      return state;
  }
};

export default userReducer;
