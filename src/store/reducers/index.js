import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './auth'
import apiStatusReducer from './apiStatus'
import octokitReducer from './octokit'

export default combineReducers({
  firebaseReducer,
  authReducer,
  octokitReducer,
  apiStatusReducer,
})
