import userTypes from '../actions/types';

const initialState = {
  currentUser: null,
};

const userReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case userTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: actions.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
