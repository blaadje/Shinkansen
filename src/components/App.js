import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Login'
import Menu from './Menu'
import {
  createMuiTheme,
  ThemeProvider,
  CircularProgress,
} from '@material-ui/core'
import Loader from './Loader'
import Dashboard from './Dashboard'
import ApplicationPage from './ApplicationPage'
import { connect, useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

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

const MainIsLoaded = (args, auth) => {
  if (!isLoaded(auth)) {
    return <CircularProgress color="secondary" />
  }

  return !isEmpty(auth) ? <Dashboard {...args} /> : <Login {...args} />
}
const App = () => {
  const auth = useSelector(state => state.firebaseReducer.auth)

  return (
    <ThemeProvider theme={theme}>
      {isLoaded(auth) && !isEmpty(auth) && <Menu />}
      <Switch>
        <Route exact path="/" component={args => MainIsLoaded(args, auth)} />
        <Route path="/login" component={Login} />
        <Route path="/application/:id" component={ApplicationPage} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
