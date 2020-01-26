import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  EMAIL_NOT_VERIFIED,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  RESET_SUCCESS,
  RESET_ERROR,
} from './actionTypes'
import { beginApiCall, apiCallError } from './apiStatus'
import firebase from '../../services/firebase'

// Signing up with Firebase
export const signup = (email, password) => async dispatch => {
  try {
    dispatch(beginApiCall())
    await firebase.auth().createUserWithEmailAndPassword(email, password)

    await firebase.auth().onAuthStateChanged(user => {
      user.sendEmailVerification()
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref('users/' + user.uid)
          .set({
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            isAnonymous: user.isAnonymous,
            email: user.email,
          })
        // Sign up successful
        dispatch({
          type: SIGNUP_SUCCESS,
          payload:
            'Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox.',
        })
      } else {
        // Signup failed
        dispatch({
          type: SIGNUP_ERROR,
          payload:
            "Something went wrong, we couldn't create your account. Please try again.",
        })
      }
    })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: SIGNUP_ERROR,
      payload:
        "Something went wrong, we couldn't create your account. Please try again.",
    })
  }
}

// Signing in with Firebase
export const signin = (email, password, callback) => async dispatch => {
  try {
    dispatch(beginApiCall())
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        firebase
          .database()
          .ref('users/' + user.uid)
          .set({
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            isAnonymous: user.isAnonymous,
            email: email,
          })

        if (user.emailVerified) {
          console.log('IF', user.emailVerified)
          dispatch({ type: SIGNIN_SUCCESS })
          callback()
        } else {
          console.log('ELSE', user.emailVerified)
          dispatch({
            type: EMAIL_NOT_VERIFIED,
            payload: "You haven't verified your e-mail address.",
          })
        }
      })
      .catch(() => {
        dispatch(apiCallError())
        dispatch({
          type: SIGNIN_ERROR,
          payload: 'Invalid login credentials',
        })
      })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({ type: SIGNIN_ERROR, payload: 'Invalid login credentials' })
  }
}

// Signing out with Firebase
export const signout = () => async dispatch => {
  try {
    dispatch(beginApiCall())

    await firebase.auth().signOut()

    dispatch({ type: SIGNOUT_SUCCESS })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: SIGNOUT_ERROR,
      payload: 'Error, we were not able to log you out. Please try again.',
    })
  }
}

// Reset password with Firebase
export const resetPassword = email => async dispatch => {
  try {
    dispatch(beginApiCall())

    await firebase.auth().sendPasswordResetEmail(email)

    dispatch({
      type: RESET_SUCCESS,
      payload:
        "Check your inbox. We've sent you a secured reset link by e-mail.",
    })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({ type: RESET_ERROR, payload: err })
  }
}
