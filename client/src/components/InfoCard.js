import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  header: {
    marginBottom: theme.spacing(1),
  },
}));

export default function InfoCard({ message, button, action, error = false }) {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.container}>
      {error && (
        <div className={classes.container}>
          <Grid
            container
            direction="column"
            spacing={1}
            alignContent="center"
            className={classes.header}
          >
            <ErrorOutlineIcon />
          </Grid>
          <Divider variant="fullWidth" />
        </div>
      )}
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Typography color="textSecondary">{message}</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={action}
          >
            {button}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
