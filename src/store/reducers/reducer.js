import actionTypes from '../actions/actionTypes';

export const initState = {
  isLoggedIn: false,
  user: undefined,
  loading: false,
  error: null,
  dialog: undefined
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true },
        ...action.payload
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...initState
      };

    default:
      return state;
  }
}

export default reducer;
