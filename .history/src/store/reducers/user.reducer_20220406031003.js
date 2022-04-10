import userTypes from '../actions/types';

const initialState = {
  // currentUser: null,
  // user: null,
  // error: null,
  isLoggedIn: false,
  loading: false,
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

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SIGNIN_START:
    case userTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case userTypes.SIGNIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    // case LOGOUT_START:
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
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
