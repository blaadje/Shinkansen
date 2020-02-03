import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Button,
  makeStyles,
  ListItemSecondaryAction,
} from '@material-ui/core'
import TrainIcon from '@material-ui/icons/Train'
import UndoIcon from '@material-ui/icons/Undo'
import Skeleton from '@material-ui/lab/Skeleton/Skeleton'

const useStyles = makeStyles(theme => ({
  listItemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  inline: {
    display: 'inline',
  },
  skeleton: {
    display: 'inline-flex',
    width: '100px',
  },
  tag: {
    background: theme.palette.primary.dark,
    borderRadius: '4px',
    padding: '4px 8px',
  },
}))

const DeployActions = ({
  currentVersion,
  previousVersion,
  handleDeploy,
  handleRollback,
  isLoading,
}) => {
  const classes = useStyles()
  return (
    <List component="nav" aria-label="main mailbox folders">
      <ListItem divider={Boolean(previousVersion)} alignItems="center">
        {!currentVersion && (
          <ListItemText>
            <Skeleton className={classes.skeleton} animation="wave" />
          </ListItemText>
        )}
        {currentVersion && currentVersion.name && (
          <ListItemText>
            <>
              Current version{' '}
              <span className={classes.tag}>{currentVersion.name}</span>
            </>
          </ListItemText>
        )}
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            color="secondary"
            disabled={isLoading}
            endIcon={<TrainIcon />}
            onClick={handleDeploy}
          >
            Deploy new version
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem alignItems="center">
        {!previousVersion && (
          <ListItemText>
            <Skeleton className={classes.skeleton} animation="wave" />
          </ListItemText>
        )}
        {previousVersion && previousVersion.name && (
          <ListItemText>
            <>
              Previous version{' '}
              <span className={classes.tag}>{previousVersion.name}</span>
            </>
          </ListItemText>
        )}
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            color="primary"
            endIcon={<UndoIcon />}
            disabled={isLoading || !previousVersion}
            onClick={handleRollback}
          >
            Rollback
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

export default DeployActions
