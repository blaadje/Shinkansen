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
} from '../actions/actionTypes'

const INITIAL_STATE = {
  authMsg: '',
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return { ...state, authMsg: '' }
    case SIGNOUT_SUCCESS:
      return { ...state, authMsg: '' }
    case SIGNUP_SUCCESS:
      return { ...state, authMsg: action.payload }
    case SIGNUP_ERROR:
      return { ...state, authMsg: action.payload }
    case SIGNIN_ERROR:
      return { ...state, authMsg: action.payload }
    case EMAIL_NOT_VERIFIED:
      return { ...state, authMsg: action.payload }
    case SIGNOUT_ERROR:
      return { ...state, authMsg: action.payload }
    case RESET_SUCCESS:
      return { ...state, authMsg: action.payload }
    case RESET_ERROR:
      return { ...state, authMsg: action.payload }
    default:
      return state
  }
}
