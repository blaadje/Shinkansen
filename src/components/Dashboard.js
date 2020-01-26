import React from 'react'
import Popper from '@material-ui/core/Popper'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import Octokit from '@octokit/rest'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'
import requireAuth from './hoc/requireAuth'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Container,
  Box,
  Button,
  InputBase,
  Card,
} from '@material-ui/core'

import LensIcon from '@material-ui/icons/Lens'
import SearchIcon from '@material-ui/icons/Search'
import { compose } from 'redux'
import { connect, useSelector } from 'react-redux'
import GithubSearch from './GithubSearch'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: 200,
    },
  },
  search: {
    position: 'sticky',
    background: 'transparent',
    top: 0,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.dark}`,
    width: '100%',
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const Dashboard = ({ auth, history }) => {
  useFirebaseConnect([`applications/${auth.uid}`])
  const applications = useSelector(
    ({ firebaseReducer: { data } }) =>
      data.applications && data.applications[auth.uid]
  )

  const [anchorEl, setAnchorEl] = React.useState(null)
  const applicationsArray = applications ? Object.values(applications) : []
  const classes = useStyles()

  const addSampleTodo = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleListItemClick = ({ id }) => {
    history.push(`/application/${id}`)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  return (
    <>
      <Box bgcolor="primary.light" p={2}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={addSampleTodo}
              endIcon={<UnfoldMoreIcon />}
            >
              New
            </Button>
            <Popper
              id={id}
              open={open}
              placement="bottom-end"
              anchorEl={anchorEl}
            >
              <Card>
                <GithubSearch connectedApps={applicationsArray} />
              </Card>
            </Popper>
          </Box>
        </Container>
      </Box>
      {!applicationsArray.length ? (
        <Container>
          <p>There's no connected app</p>
        </Container>
      ) : (
        <>
          <Box pt={3} pb={3}>
            <Container maxWidth="lg">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Container>
          </Box>
          <List
            className={classes.root}
            component="nav"
            aria-label="main mailbox folders"
          >
            {applicationsArray.map(application => {
              return (
                <ListItem
                  key={application.name}
                  divider
                  className={classes.listItem}
                  button
                  onClick={() => handleListItemClick(application)}
                >
                  <Container className={classes.container} maxWidth="lg">
                    <ListItemIcon>
                      <LensIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={application.name} />
                  </Container>
                </ListItem>
              )
            })}
          </List>
        </>
      )}
    </>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

export default compose(connect(mapStateToProps), requireAuth)(Dashboard)
