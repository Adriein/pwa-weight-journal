import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { traduceCategories } from '../helpers';
import { useHistory } from 'react-router-dom';

import useInputState from '../hooks/useInputState';
import useCounter from '../hooks/useCounter';
import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Navigation from './Navigation';
import SearchBar from './SearchBar';
import LogCard from './LogCard';
import InfoCard from './InfoCard';

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
}));

export default function RegisterBook() {
  const classes = useStyles();
  const history = useHistory();
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [value, , , setValue] = useInputState({
    date: new Date(),
  });

  const handleDateChange = (date) => {
    setValue(Object.assign({}, value, { date }));
  };

  const [counter, modifyCounter, reset] = useCounter({
    series: 0,
    reps: 0,
    kg: 0,
  });

  const discard = () => {
    setValue(Object.assign({}, value, { date: new Date() }));
    reset();
    exerciceDispatcher({ type: 'DISCARD_SELECTION' });
  };

  const saveLog = async () => {
    const response = await axios.post(
      '/api/log',
      Object.assign(
        {},
        value,
        { stats: counter },
        { exerciceId: exercices.selected.id }
      )
    );
    console.log(response);
    exerciceDispatcher({ type: 'DISCARD_SELECTION' });
  };

  const handleRedirect = () => {
    history.push('/create-exercice');
  };

  useEffect(() => {
    (async () => {
      exerciceDispatcher({
        type: 'FETCH_CATEGORIES',
        payload: (await axios.get('/api/categories')).data,
      });
    })();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
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
      <Container maxWidth="md" component="main" className={classes.container}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="center">
            {!exercices.selected && (
              <>
                <Grow in={!exercices.selected ? true : false} timeout={1000}>
                  <Grid item xs={12}>
                    <SearchBar className={classes.item} />
                  </Grid>
                </Grow>
                <Grow in={!exercices.selected ? true : false} timeout={1000}>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      className={classes.categories}
                    >
                      {exercices.categories.map((category) => {
                        return (
                          // <Grid item xs={4} key={category}>
                          //   <Chip label={category} clickable />
                          // </Grid>
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>
                                {traduceCategories(category)}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grow>
                <Grow in={!exercices.selected ? true : false} timeout={1000}>
                  <Grid item xs={12} className={classes.info}>
                    <InfoCard
                      message={'No encuentras el ejercicio que buscas?'}
                      button={'Crear Ejercicio'}
                      action={handleRedirect}
                    />
                  </Grid>
                </Grow>
              </>
            )}
            {exercices.selected && (
              <>
                <Slide direction="down" in={exercices.selected ? true : false}>
                  <Grid item>
                    <KeyboardDatePicker
                      margin="normal"
                      name="date"
                      label="Selecciona una fecha"
                      format="dd/MM/yyyy"
                      value={value.date}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      className={classes.item}
                    />
                  </Grid>
                </Slide>

                <Grow in={exercices.selected ? true : false} timeout={1000}>
                  <Grid item>
                    <LogCard
                      counter={counter}
                      modifyCounter={modifyCounter}
                      discard={discard}
                      saveLog={saveLog}
                    />
                  </Grid>
                </Grow>
              </>
            )}
          </Grid>
        </MuiPickersUtilsProvider>
      </Container>
      <footer className={classes.footer}>
        <Box mt={8}>
          <Navigation settings={0} />
        </Box>
      </footer>
    </div>
  );
}
