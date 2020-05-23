import React from 'react'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined'
import { useFirebase } from 'react-redux-firebase'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Container,
  Button,
  CircularProgress,
} from '@material-ui/core'

import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    width: '600px',
    height: '400px',
    overflow: 'scroll',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    '&:hover': {
      cursor: 'initial',
      backgroundColor: 'transparent',
    },
  },
  container: {
    display: 'flex',
    padding: '10px 0px',
    alignItems: 'center',
  },
  checkedIcon: {
    fill: '#30ae43',
  },
}))

const GithubSearch = ({ auth, profile, username, connectedApps, octokit }) => {
  const [repos, setRepos] = React.useState([])
  const firebase = useFirebase()
  const classes = useStyles()

  React.useEffect(() => {
    const getRepos = async () => {
      const { data } = await octokit.repos.list({ sort: 'updated' })

      setRepos(data)
    }
    getRepos()
  }, [octokit.repos])

  const handleListItemClick = async repo => {
    const { data } = await octokit.repos.createHook({
      owner: profile.username,
      repo: repo.name,
      events: ['deployment', 'deployment_status'],
      config: {
        url: `${process.env.REACT_APP_SERVER_DOMAIN}/node`,
        content_type: 'json',
        secret: 'bonjour',
      },
    })

    firebase.push(`applications/${auth.uid}`, { ...repo, hookId: data.id })
  }

  return (
    <List className={classes.root} component="nav">
      {!repos.length ? (
        <CircularProgress color="secondary" />
      ) : (
        repos.map(repo => {
          const isConnected = connectedApps.some(({ id }) => id === repo.id)
          return (
            <ListItem
              key={repo.name}
              divider
              className={classes.listItem}
              button
            >
              <Container className={classes.container} maxWidth="lg">
                <ListItemIcon>
                  {isConnected ? (
                    <CheckCircleOutlineOutlinedIcon
                      className={classes.checkedIcon}
                    />
                  ) : (
                    <BookOutlinedIcon color="secondary" />
                  )}
                </ListItemIcon>
                <ListItemText primary={`${username}/${repo.name}`} />
                <Button
                  disabled={isConnected}
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleListItemClick(repo)}
                >
                  {isConnected ? 'Connected' : 'Connect'}
                </Button>
              </Container>
            </ListItem>
          )
        })
      )}
    </List>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
    profile: state.firebaseReducer.profile,
    username: state.firebaseReducer?.profile?.username,
    octokit: state.octokitReducer.octokit,
  }
}

export default connect(mapStateToProps)(GithubSearch)
