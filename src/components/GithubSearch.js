import React from 'react'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined'
import Octokit from '@octokit/rest'
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

const GithubSearch = ({ auth, username, connectedApps }) => {
  const [repos, setRepos] = React.useState([])
  const firebase = useFirebase()
  const classes = useStyles()
  const octokit = new Octokit()

  React.useEffect(() => {
    if (!username) {
      return
    }

    const getRepos = async () => {
      const { data } = await octokit.repos.listForUser({
        username,
      })
      setRepos(data)
    }
    getRepos()
  }, [username])

  const handleListItemClick = repo => {
    firebase.push(`applications/${auth.uid}`, repo)
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
    username: state.firebaseReducer?.profile?.additionalUserInfo?.username,
  }
}

export default connect(mapStateToProps)(GithubSearch)
