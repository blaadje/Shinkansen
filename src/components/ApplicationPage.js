import React from 'react'
import TrainIcon from '@material-ui/icons/Train'
import UndoIcon from '@material-ui/icons/Undo'
import DeleteIcon from '@material-ui/icons/Delete'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LensIcon from '@material-ui/icons/Lens'
import {
  Container,
  Box,
  makeStyles,
  Breadcrumbs,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core'
import { useParams, Link } from 'react-router-dom'
import { useFirebaseConnect } from 'react-redux-firebase'
import { useSelector, connect } from 'react-redux'
import { compose } from 'redux'
import requireAuth from './hoc/requireAuth'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}))

const ApplicationPage = ({ auth, profile, octokit }) => {
  const classes = useStyles()
  const [deployments, setDeployments] = React.useState([])
  let { uid } = useParams()
  useFirebaseConnect([`applications/${auth.uid}/${uid}`])
  const application = useSelector(
    ({ firebaseReducer: { data } }) =>
      data.applications &&
      data.applications[auth.uid] &&
      data.applications[auth.uid][uid]
  )
  React.useEffect(() => {
    if (!application || !octokit) {
      return
    }
    const fetch = async () => {
      const { data } = await octokit.repos.listDeployments({
        owner: profile.username,
        repo: application.name,
      })

      const result = await Promise.all(
        data.map(async ({ id }) => {
          const { data } = await octokit.repos.listDeploymentStatuses({
            owner: profile.username,
            repo: application.name,
            deployment_id: id,
          })
          return data[data.length - 1]
        })
      )
      setDeployments(result)
    }
    fetch()
  }, [application, octokit])

  return application ? (
    <>
      <Box bgcolor="primary.light" p={2} marginBottom={6}>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to="/" className={classes.link}>
                <AccountCircleIcon className={classes.icon} />
                Personnal
              </Link>
              <Typography color="textPrimary" className={classes.link}>
                <LensIcon color="secondary" />
                {application.name}
              </Typography>
            </Breadcrumbs>
            <Box marginLeft="auto">
              <Button
                variant="contained"
                color="secondary"
                endIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={6}>
            Deployments commands
            <Card>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem divider>
                  <ListItemText primary="Last version v.1.1.1" />
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<TrainIcon />}
                    // onClick={handleDeploy}
                  >
                    Deploy
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Previous version v.1.1.0" />
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<UndoIcon />}
                  >
                    Rollback
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            Deployments activity
            <List className={classes.root}>
              {deployments.map(deployment => {
                console.log(deployment)
                const date = new Date(deployment.created_at)
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'full',
                }).format(date)
                return (
                  <ListItem key={deployment.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={deployment.creator.avatar_url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={deployment.creator.login}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            style={{
                              color:
                                deployment.state === 'success'
                                  ? 'green'
                                  : 'red',
                            }}
                          >
                            {deployment.state}
                          </Typography>
                          {formattedDate}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                )
              })}
            </List>
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
