import React, { useState } from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import {
  FormGroup,
  makeStyles,
  Button,
  IconButton,
  Divider,
  CircularProgress,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { signup, signin, resetPassword, signout } from '../store/actions/auth'
import useForm from '../utils/useForm'
import validate from '../utils/validateLoginForm'
import Spinner from './Spinner'
import {
  Box,
  Typography,
  Card,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useFirebase } from 'react-redux-firebase'

const useStyles = makeStyles(theme => ({
  form: {
    paddingBottom: theme.spacing(4),
  },
  divider: {
    position: 'relative',
    overflow: 'visible',
    '&:after': {
      content: '"Or"',
      color: '#8b6baf',
      position: 'absolute',
      background: 'white',
      padding: '0 20px',
      top: '-11px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
}))

const Login = ({
  signup,
  signin,
  resetPassword,
  authMsg,
  history,
  loading,
  userId,
}) => {
  const classes = useStyles()
  const [newUser, setNewUser] = useState(false)
  const [reset, SetReset] = useState(false)
  const firebase = useFirebase()
  const [credentials, handleChange, handleSubmit, errors] = useForm(
    login,
    validate,
    reset
  )

  function login() {
    if (newUser) {
      // signup
      signup(credentials.email, credentials.password)
    } else {
      if (reset) {
        // reset password
        resetPassword(credentials.email)
      } else {
        // signin
        signin(credentials.email, credentials.password, () => history.push('/'))
      }
    }
  }

  const handleGithubConnection = async () => {
    const { additionalUserInfo } = await firebase.login({
      provider: 'github',
      type: 'popup',
    })

    return firebase.updateProfile({ additionalUserInfo })
  }

  return (
    <Box
      style={{ background: 'linear-gradient(to bottom,#654a86,#534292)' }}
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card>
        <Box p={6}>
          <Box pb={3} width="380px">
            <Typography color="secondary" variant="h6">
              {reset
                ? 'Reset password'
                : newUser
                ? 'Create an account'
                : 'Sign in to your account'}
            </Typography>
          </Box>
          <Button
            variant="contained"
            style={{ background: '#3988f2', color: 'white' }}
            startIcon={<span>G</span>}
          >
            Sign in with google
          </Button>
          <Box
            display="inline-block"
            marginLeft={2}
            borderRadius="50%"
            bgcolor="primary.light"
          >
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
              onClick={handleGithubConnection}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
          <Box paddingY={5}>
            <Divider className={classes.divider} />
          </Box>
          {authMsg && <p className="auth-message">{authMsg}</p>}
          <form onSubmit={handleSubmit} noValidate>
            <Box pb={4}>
              {/* Email */}
              <FormGroup className={classes.form}>
                <TextField
                  error={errors.emailIsEmpty || errors.emailFormatInvalid}
                  id="email"
                  name="email"
                  placeholder="Email address"
                  helperText={
                    (errors && errors.emailIsEmpty) ||
                    (errors && errors.emailFormatInvalid)
                  }
                  defaultValue={credentials.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormGroup>

              {/* PASSWORD */}
              {!reset && (
                <FormGroup>
                  <TextField
                    error={errors.passIsStrong || errors.passIsEmpty}
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    defaultValue={credentials.password}
                    helperText={
                      (errors && errors.passIsStrong) ||
                      (errors && errors.passIsEmpty)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon color="secondary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormGroup>
              )}
            </Box>

            {/* BUTTONS */}
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="secondary" type="submit">
                {loading ? (
                  <CircularProgress color="secondary" />
                ) : reset ? (
                  'Reset password'
                ) : newUser ? (
                  'Create account'
                ) : (
                  'Sign in'
                )}
              </Button>
              {!newUser && !reset && (
                <Button variant="text" onClick={() => SetReset(true)}>
                  Forgot password?
                </Button>
              )}
              {reset && (
                <Button variant="contained" onClick={() => SetReset(false)}>
                  Back to sign in
                </Button>
              )}
            </Box>
          </form>
        </Box>
        <Box
          p={4}
          display="flex"
          bgcolor="primary.light"
          alignItems="center"
          borderTop={`1px solid #dddddd`}
          justifyContent="space-between"
        >
          <Typography component="span" color="secondary">
            {newUser ? 'Already have an account?' : 'New to shinkansen?'}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setNewUser(!newUser)
              if (reset) SetReset(false)
            }}
          >
            {newUser ? 'Sign in' : 'Create an account'}
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

function mapStateToProps(state) {
  return {
    userId: state.firebaseReducer.auth.uid,
    authMsg: state.authReducer.authMsg,
    loading: state.apiStatusReducer.apiCallsInProgress > 0,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (email, password) => dispatch(signup(email, password)),
    signin: (email, password, callback) =>
      dispatch(signin(email, password, callback)),
    signout: () => dispatch(signout()),
    resetPassword: email => dispatch(resetPassword(email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
