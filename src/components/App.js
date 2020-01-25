import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Login'
import Menu from './Menu'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Loader from './Loader'
import Dashboard from './Dashboard'
import { connect } from 'react-redux'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Capriola',
    fontWeightLight: 100,
    fontWeightRegular: 100,
    fontWeightMedium: 100,
    fontWeightBold: 100,
  },
  palette: {
    primary: {
      main: '#ffffff',
      light: '#f7f8fb',
      dark: '#e7ebf3',
      contrastText: '#8b6baf',
    },
    secondary: {
      main: '#8b6baf',
      contrastText: '#e7ebf3',
    },
  },
})

const Main = auth => (
  <>{!auth.isLoaded ? <Loader /> : !auth.isEmpty ? <Dashboard /> : <Login />}</>
)

const App = ({ auth }) => {
  return (
    <ThemeProvider theme={theme}>
      {auth.isLoaded && !auth.isEmpty && <Menu />}
      <Switch>
        <Route exact path="/" component={() => Main(auth)} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </ThemeProvider>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

export default connect(mapStateToProps)(App)
