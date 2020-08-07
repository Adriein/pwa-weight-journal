import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  container: {
    padding: theme.spacing(3, 2, 2, 2),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footer: {
    marginTop: 'auto',
  },
  error: {
    marginTop: theme.spacing(5),
  },
  item: {
    marginBottom: theme.spacing(4),
  },
  info: {
    position: 'fixed',
    bottom: 80,
    width: '90%',
  },
  categories: {
    marginTop: theme.spacing(2),
  },
  categoryContainer: {
    padding: theme.spacing(3),
    minWidth: '100%',
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Weight Logs
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
