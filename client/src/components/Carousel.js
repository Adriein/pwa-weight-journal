import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  carousel: {
    padding: theme.spacing(2),
  },
}));

export default function Carousel({ pagination = 2, children }) {
  const classes = useStyles();
  console.log(children);
  const paginateChildren = (pagination) => {
    return children.map((child, index) => (index < pagination ? child : null));
  };
  return (
    <Paper elevation={6} className={classes.carousel}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <IconButton>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row">
            ´{paginateChildren(pagination)}
          </Grid>
        </Grid>
        <Grid item>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
