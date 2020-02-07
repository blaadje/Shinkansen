import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'

import io from 'socket.io-client'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import DeleteIcon from '@material-ui/icons/Delete'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import {
  Container,
  Box,
  makeStyles,
  Breadcrumbs,
  Typography,
  Button,
  Grid,
  Card,
} from '@material-ui/core'
import { useParams, Link } from 'react-router-dom'
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import { useSelector, connect } from 'react-redux'
import { compose } from 'redux'
import requireAuth from '../components/hoc/requireAuth'
import DeployList from '../components/DeployList'
import DeployActions from '../components/DeployActions'
import {
  currentDeployStatus,
  isStatusLoading,
  sortArrayWithDates,
} from '../views/helpers'
import { fetchDeploys, fetchTags, fetchStatus } from './helpers'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  blueLink: {
    color: '#006deb',
    marginLeft: theme.spacing(0.5),
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}))

const ApplicationPage = ({ auth, profile, octokit, history }) => {
  const classes = useStyles()
  const firebase = useFirebase()
  const [deployments, setDeployments] = React.useState([])
  const [status, setStatus] = React.useState({})
  const [tags, setTags] = React.useState([])

  let { uid } = useParams()

  useFirebaseConnect([`applications/${auth.uid}/${uid}`])

  const application = useSelector(
    ({ firebaseReducer: { data } }) =>
      data.applications &&
      data.applications[auth.uid] &&
      data.applications[auth.uid][uid]
  )

  const currentVersion = tags[0] || null
  const previousVersion = tags[1] || null

  React.useEffect(() => {
    const socket = io.connect(process.env.REACT_APP_SERVER_DOMAIN, {
      secure: true,
    })

    socket.on('event', ({ body }) => {
      const { deployment, deployment_status } = body

      if (deployment && !deployment_status) {
        setDeployments(prevDeploys => [...prevDeploys, body.deployment])
        return
      }

      setStatus(prevStatus => {
        if (!prevStatus) {
          return
        }
        return {
          ...prevStatus,
          [body.deployment.id]: [
            ...prevStatus[body.deployment.id],
            body.deployment_status,
          ],
        }
      })
    })
  }, [])

  React.useEffect(() => {
    if (!application || !octokit) {
      return
    }
    const deploys = async () => {
      const deploys = await fetchDeploys(octokit, profile, application)
      setDeployments(deploys)
    }
    const tags = async () => {
      const tags = await fetchTags(octokit, profile, application)
      setTags(tags)
    }

    deploys()
    tags()
  }, [application, octokit, profile, profile.username])

  React.useEffect(() => {
    const status = () => {
      deployments.map(async ({ id }) => {
        const status = await fetchStatus(id, octokit, profile, application)

        setStatus(previousState => ({
          ...previousState,
          [id]: status,
        }))
      })
    }

    status()
    // eslint-disable-next-line
  }, [deployments])

  const handleDeploy = async () => {
    await octokit.repos.createDeployment({
      owner: profile.username,
      repo: application.name,
      ref: 'master',
    })
  }

  const handleRollback = async () => {
    const tags = await fetchTags(octokit, profile, application)
    const prevVersion = tags[1]

    octokit.repos.createDeployment({
      owner: profile.username,
      repo: application.name,
      ref: prevVersion.commit.sha,
      auto_merge: false,
    })
    setTags(tags)
  }

  const handleDelete = async () => {
    await firebase.remove(`applications/${auth.uid}/${uid}`)
    history.push('/')
    octokit.repos.deleteHook({
      owner: profile.username,
      repo: application.name,
      hook_id: application.hookId,
    })
  }

  const orderedDeployments = sortArrayWithDates(deployments)
  const deployStatus = currentDeployStatus(status, orderedDeployments)
  const isLoading = isStatusLoading(deployStatus)

  return application ? (
    <>
      <Box bgcolor="primary.light" p={2} marginBottom={6}>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Breadcrumbs
              separator={<ChevronRightIcon />}
              aria-label="breadcrumb"
            >
              <Link to="/" className={classes.link}>
                <Box display="flex" marginRight={1}>
                  <AccountCircleIcon />
                </Box>
                <Typography color="textPrimary">Personnal</Typography>
              </Link>
              <Box display="flex">
                <Box display="flex" marginRight={1}>
                  <GitHubIcon fontSize="small" />
                </Box>
                <Typography color="textPrimary">{application.name}</Typography>
              </Box>
            </Breadcrumbs>
            <Box marginLeft="auto">
              <Button
                variant="contained"
                color="secondary"
                endIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container justify="space-between" spacing={6}>
          <Grid item xs={12} md={6}>
            <Box marginBottom={2}>
              <Typography>Deployments commands</Typography>
            </Box>
            <Card>
              <DeployActions
                isLoading={isLoading}
                currentVersion={currentVersion}
                previousVersion={previousVersion}
                handleDeploy={handleDeploy}
                handleRollback={handleRollback}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Deployments activity</Typography>
            <DeployList status={status} deployments={orderedDeployments} />
          </Grid>
        </Grid>
      </Container>
    </>
  ) : null
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
    profile: state.firebaseReducer.profile,
    octokit: state.octokitReducer.octokit,
  }
}

export default compose(connect(mapStateToProps), requireAuth)(ApplicationPage)
