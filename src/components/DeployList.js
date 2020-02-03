import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import LinearProgress from '@material-ui/core/LinearProgress'
import ErrorIcon from '@material-ui/icons/Error'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
} from '@material-ui/core'
import { isStatusLoading, sortArrayWithDates } from '../utils'

const useStyles = makeStyles(theme => ({
  listItemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  inline: {
    display: 'inline',
  },
  login: {
    fontWeight: 500,
  },
  skeleton: {
    width: '100px',
    display: 'inline-flex !important',
  },
  loader: {
    height: '10px',
    width: '24px',
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

const DeployList = ({ status, deployments }) => {
  const classes = useStyles()
  return (
    <List>
      {deployments.map(deployment => {
        const orderedStatus = sortArrayWithDates(
          status[deployment.id],
          'created_at'
        )
        const deployStatus = orderedStatus ? orderedStatus[0] || {} : {}
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }
        const date = new Date(deployment.created_at)
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
          date
        )

        const getStatusColor = status => {
          switch (status) {
            case 'success':
              return {
                icon: <CheckCircleIcon htmlColor="green" />,
                color: 'green',
              }
            case 'failure':
              return { icon: <ErrorIcon color="error" />, color: 'red' }
            case 'pending':
              return {
                icon: (
                  <LinearProgress
                    className={classes.loader}
                    color="secondary"
                  />
                ),
                color: 'gold',
              }
            default:
              return {
                icon: (
                  <LinearProgress
                    className={classes.loader}
                    color="secondary"
                  />
                ),
                color: 'green',
              }
          }
        }

        return (
          <ListItem key={deployment.id} divider alignItems="center">
            <ListItemIcon className={classes.listItemIcon}>
              {getStatusColor(deployStatus.state).icon}
            </ListItemIcon>
            <ListItemAvatar>
              <Avatar src={deployment.creator.avatar_url} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography component="span" className={classes.login}>
                    {deployment.creator.login}:{' '}
                  </Typography>
                  {!deployStatus.state && (
                    <Skeleton
                      component="span"
                      className={classes.skeleton}
                      animation="wave"
                    />
                  )}
                  {deployStatus.state && (
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      style={{
                        color: getStatusColor(deployStatus.state).color,
                      }}
                    >
                      Build {deployStatus.state}
                    </Typography>
                  )}
                </>
              }
              secondary={
                <>
                  <span>{formattedDate}</span>
                  {!isStatusLoading(deployStatus.state) && (
                    <Link
                      to="/"
                      className={classes.blueLink}
                      onClick={() => {
                        console.info("I'm a button.")
                      }}
                    >
                      View build log
                    </Link>
                  )}
                </>
              }
            />
          </ListItem>
        )
      })}
    </List>
  )
}

export default DeployList
