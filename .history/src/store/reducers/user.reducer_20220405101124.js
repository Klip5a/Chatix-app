import userTypes from '../actions/types';

const initialState = {
  // currentUser: null,
  // user: null,
  // error: null,
  isLoading: false,
  isLoggedIn: false,
  user: null,
  error: null,
};

// const userReducer = (state = initialState, actions) => {
//   switch (actions.type) {
//     case userTypes.SIGNIN_SUCCESS:
//       return {
//         ...state,
//         currentUser: actions.payload,
//       };

//     default:
//       return state;
//   }
// };

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userTypes.SIGNIN_START:
    // case LOGOUT_START:
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    case userTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: payload,
      };

    case userTypes.SIGNIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isLoading: false,
        error: payload,
      };

    // case LOGOUT_SUCCESS:
    //   return {
    //     ...initialState,
    //   };
    // case LOGOUT_FAIL: {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: payload,
    //   };
    // }

    default:
      return state;
  }
};

export default userReducer;
