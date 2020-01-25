import React from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import Login from './Login'
import Loader from './Loader'

const Main = ({ auth }) => (
  <>{!auth.isLoaded ? <Loader /> : !auth.isEmpty ? <Dashboard /> : <Login />}</>
)

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

export default connect(mapStateToProps)(Main)
