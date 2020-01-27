import {
  BEGIN_API_CALL,
  API_CALL_ERROR,
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
  RESET_SUCCESS,
  SIGNOUT_SUCCESS,
} from '../actions/actionTypes'

const INITIAL_STATE = {
  apiCallsInProgress: 0,
}

export default function apiCallStatusReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BEGIN_API_CALL:
      return { ...state, apiCallsInProgress: 1 }
    case API_CALL_ERROR:
      return { ...state, apiCallsInProgress: 0 }
    case SIGNIN_SUCCESS:
      return { ...state, apiCallsInProgress: 0 }
    case SIGNUP_SUCCESS:
      return { ...state, apiCallsInProgress: 0 }
    case RESET_SUCCESS:
      return { ...state, apiCallsInProgress: 0 }
    case SIGNOUT_SUCCESS:
      return { ...state, apiCallsInProgress: 0 }
    default:
      return state
  }
}
