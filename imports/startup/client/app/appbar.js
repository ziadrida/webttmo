import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// added for menu with button and menu icon
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class AppBarComponent extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    console.log('click:',event.currentTarget)
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
      const { anchorEl } = this.state;
        const { classes } = this.props;



        //    <div className="mui-appbar">
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
        <IconButton
              className={classes.menuButton}
              color="inherit" aria-label="Menu"
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
          >
          <MenuIcon />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
         <MenuList>
          <MenuItem onClick={this.handleClose} component={Link} to="/quotations">
            Quotations
          </MenuItem>
          <MenuItem onClick={this.handleClose} component={Link} to="/orders">
            Purchase Orders
          </MenuItem>
          <MenuItem onClick={this.handleClose} component={Link} to="/users">
            Users
          </MenuItem>
         </MenuList>

        </Menu>
          <Typography variant="h6" color="inherit"  className={classes.grow}>
            TechTown Mail Order
          </Typography>
            <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
}

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarComponent);
