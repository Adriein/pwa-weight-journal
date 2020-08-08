import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { ExerciceContext } from '../context/ExerciceContext';
import { beautifyName } from '../helpers';

import Log from './Log';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '350px',
    padding: theme.spacing(1, 2, 2, 2),
  },
  okButton: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
    marginRight: theme.spacing(3),
  },
  cancelButton: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

export default function LogCard({ counter, modifyCounter, discard, saveLog }) {
  const classes = useStyles();
  const exercice = useContext(ExerciceContext);
  const [beautifiedExercice] =
    exercice.selected.name !== '' || exercice.selected.name !== undefined
      ? beautifyName([exercice.selected])
      : '';

  return (
    <Card className={classes.card}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h6" gutterBottom>
          {beautifiedExercice.name}
        </Typography>
      </Grid>
      <Divider />
      <Log
        counter={counter.series}
        name={'Series'}
        modifyCounter={modifyCounter}
      />
      <Log
        counter={counter.reps}
        name={'Repeticiones'}
        modifyCounter={modifyCounter}
      />
      <Log
        counter={counter.kg}
        name={'Peso (Kg)'}
        modifyCounter={modifyCounter}
      />
      <Divider />
      <CardActions>
        <Grid container direction="row" justify="center" alignItems="center">
          <Fab
            size="small"
            aria-label="save"
            className={classes.okButton}
            onClick={saveLog}
          >
            <DoneIcon />
          </Fab>
          <Fab
            size="small"
            aria-label="save"
            className={classes.cancelButton}
            onClick={discard}
          >
            <ClearIcon />
          </Fab>
        </Grid>
      </CardActions>
    </Card>
  );
}
