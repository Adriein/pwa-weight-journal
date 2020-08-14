import React, { useContext, useState } from 'react';
import axios from 'axios'

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { AuthContext } from '../context/AuthContext';
import { DispatchContext } from '../context/AuthContext';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#2368a2',
    color: '#f1f3f5',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  avatar: {
    backgroundColor: '#aad4f5',
    color: '#f1f3f5'
  }
}));

export default function Header({ currentPage, navigation, goBack }) {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const dispatch = useContext(DispatchContext);
  const getFirstLetter = (username) => {
    return username.split('')[0];
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      const response = await axios.post('api/auth/signout');
      dispatch({
        type: 'LOGOUT',
        response,
      });
    } catch (error) {
      dispatch({
        type: 'LOGOUT_ERROR',
        error: error.response.data.errors,
      });
    }
  };
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          direction="row"
        >
          {navigation && (
            <IconButton onClick={goBack}>
              <ArrowBackIosIcon />
            </IconButton>
          )}
          <Typography
            variant="h4"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            {currentPage}
          </Typography>
          <Avatar className={classes.avatar} onClick={handleClick}>{getFirstLetter(auth.username)}</Avatar>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Salir</MenuItem>
          </Menu>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
