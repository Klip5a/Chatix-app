import userTypes from './types';

// export const emailSignInStart = (userCredentials) => ({
//   type: userTypes.EMAIL_SIGN_IN_START,
//   payload: userCredentials,
// });

// export const signInSuccess = (user) => ({
//   type: userTypes.SIGNIN_SUCCESS,
//   payload: user,
// });

// export const signInStart = (payload) => ({
//   type: userTypes.SIGNIN_START,
//   payload,
// });

// export const signInSuccess = (payload) => ({
//   type: userTypes.SIGNIN_SUCCESS,
//   payload,
// });

// export const signInFail = (payload) => ({
//   type: userTypes.SIGNIN_ERROR,
//   payload,
// });

/**
 *
//  * @param {email, password} values
 */
export const signInUser = (userCredentials) => ({
    type: userTypes.SIGNIN_USER,
    payload: userCredentials
});

/**
 *
 * @param {token} user
 */
export const signInUserSuccess = (user) => ({
    type: userTypes.SIGNIN_SUCCESS,
    user,
});

/**
 *
 * @param {text} alertMessage
 */
export const setAlertAction = (alertMessage) => ({
    type: userTypes.SET_ALERT,
    alertMessage,
});

export const resetAlertAction = () => ({
    type: userTypes.RESET_ALERT
});
