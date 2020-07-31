import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  incrementDecrementButton: {
    minHeight: '20px',
    width: '20px',
    height: '20px',
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.info.main,
    padding: theme.spacing(1.5),
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  infoContainer: {
    padding: theme.spacing(1),
  },
}));

const inputStyles = makeStyles((theme) => ({
  root: {
    width: '30px',
    height: '30px',
    margin: '0px',
    padding: '0px',
    '& input': {
      textAlign: 'center',
      padding: '0px',
    },
  },
}));

export default function Log({ counter, name, modifyCounter, handleInput }) {
  const classes = useStyles();
  const classesInput = inputStyles();
  const type =
    name === 'Series' ? 'series' : name === 'Repeticiones' ? 'reps' : 'kg';

  return (
    <CardContent>
      <Grid
        container
        direction="row"
        className={classes.infoContainer}
        spacing={2}
        justify="center"
      >
        <Grid item xs={6}>
          <Typography variant="body1" gutterBottom>
            {name}
          </Typography>
        </Grid>
        <Grid item>
          <Fab
            size="small"
            aria-label="decrement"
            onClick={modifyCounter(type)}
            name="decrement"
            className={classes.incrementDecrementButton}
          >
            <RemoveIcon />
          </Fab>
        </Grid>
        <Grid item>
          <TextField
            variant="filled"
            value={counter}
            onChange={modifyCounter(type)}
            className={classes.root}
            InputProps={{ classes: classesInput, disableUnderline: true }}
          />
        </Grid>
        <Grid item>
          <Fab
            size="small"
            aria-label="increment"
            onClick={modifyCounter(type)}
            name="increment"
            className={classes.incrementDecrementButton}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </CardContent>
  );
}
