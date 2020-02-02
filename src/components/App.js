import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../views/Login'
import Menu from './Menu'
import {
  createMuiTheme,
  ThemeProvider,
  CircularProgress,
} from '@material-ui/core'
import Dashboard from '../views/Dashboard'
import AppDetails from '../views/AppDetails'
import { connect, useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { loadOctokit } from '../store/actions/auth'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Helvetica',
    fontWeightLight: 300,
    fontWeightRegular: 300,
    fontWeightMedium: 300,
    fontWeightBold: 300,
  },
  palette: {
    text: { primary: '#62738d' },
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

const MainIsLoaded = (args, auth) => {
  if (!isLoaded(auth)) {
    return <CircularProgress color="secondary" />
  }

  return !isEmpty(auth) ? <Dashboard {...args} /> : <Login {...args} />
}
const App = ({ profile, loadOctokit }) => {
  React.useEffect(() => {
    if (!profile.accessToken) {
      return
    }
    loadOctokit(profile.accessToken)
  }, [profile, loadOctokit])
  const auth = useSelector(state => state.firebaseReducer.auth)

  return (
    <ThemeProvider theme={theme}>
      {isLoaded(auth) && !isEmpty(auth) && <Menu />}
      <Switch>
        <Route exact path="/" component={args => MainIsLoaded(args, auth)} />
        <Route path="/login" component={Login} />
        <Route path="/application/:uid" component={AppDetails} />
      </Switch>
    </ThemeProvider>
  )
}

function mapStateToProps(state) {
  return {
    profile: state.firebaseReducer.profile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadOctokit: token => dispatch(loadOctokit(token, dispatch)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
