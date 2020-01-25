import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import MenuMui from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { connect } from 'react-redux'
import { signout } from '../store/actions/auth'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menu: {
    boxShadow: 'none',
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginLeft: 'auto',
    },
  },
}))

const Menu = ({ signout }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const onLoggout = () => {
    setAnchorEl(null)
    signout()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <MenuMui
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      color="secondary"
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={onLoggout}>Logout</MenuItem>
    </MenuMui>
  )

  return (
    <div className={classes.grow}>
      <AppBar className={classes.menu} position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Shinkansen
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    signout: () => dispatch(signout()),
  }
}

export default connect(null, mapDispatchToProps)(Menu)
