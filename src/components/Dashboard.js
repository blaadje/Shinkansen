import React from 'react'
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
} from '@material-ui/core'

import LensIcon from '@material-ui/icons/Lens'
import SearchIcon from '@material-ui/icons/Search'
import { compose } from 'redux'
import { connect, useSelector } from 'react-redux'
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
    position: 'relative',
    background: 'transparent',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.dark}`,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '272px',
    },
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

const Dashboard = ({ auth }) => {
  useFirebaseConnect([`applications/${auth.uid}`])
  const applications = useSelector(
    ({ firebaseReducer: { data } }) =>
      data.applications && data.applications[auth.uid]
  )
  const applicationsArray = applications && Object.values(applications)
  const classes = useStyles()
  const handleListItemClick = () => {}
  const firebase = useFirebase()

  const addSampleTodo = async () => {
    const response = await firebase.push(`applications/${auth.uid}`, {
      name: 'foo2',
      repository: 'bar',
    })
  }

  return (
    <>
      <Box bgcolor="primary.light" p={2}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={addSampleTodo}
            >
              New
            </Button>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Box pt={3} pb={3}>
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
        </Box>
      </Container>
      <List
        className={classes.root}
        component="nav"
        aria-label="main mailbox folders"
      >
        {applicationsArray &&
          applicationsArray.map(({ name }) => {
            return (
              <ListItem
                key={name}
                divider
                className={classes.listItem}
                button
                onClick={handleListItemClick}
              >
                <Container className={classes.container} maxWidth="lg">
                  <ListItemIcon>
                    <LensIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </Container>
              </ListItem>
            )
          })}
      </List>
    </>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

export default compose(connect(mapStateToProps), requireAuth)(Dashboard)
