import React, { useContext } from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';

import { AuthContext } from '../context/AuthContext';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
}));

export default function Header({ currentPage, navigation, goBack }) {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const getFirstLetter = (username) => {
    return username.split('')[0];
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
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            {currentPage}
          </Typography>
          <Avatar>{getFirstLetter(auth.username)}</Avatar>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
