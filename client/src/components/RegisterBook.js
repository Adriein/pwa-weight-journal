import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { traduceCategories } from '../helpers';
import { useHistory } from 'react-router-dom';

import useInputState from '../hooks/useInputState';
import useCounter from '../hooks/useCounter';
import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';

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
import Header from './Header';

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
    marginTop: theme.spacing(6),
  },
  categories: {
    marginTop: theme.spacing(2),
  },
  categoryContainer: {
    padding: theme.spacing(3),
    minWidth: '100%',
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

  // useEffect(() => {
  //   (async () => {
  //     exerciceDispatcher({
  //       type: 'FETCH_CATEGORY',
  //       payload: (await axios.get(`/api/category/${selectedCategory}`)).data,
  //     });
  //   })();
  // }, [selectedCategory]);

  const clickCategory = (event) => {
    console.log(event.currentTarget.id)
    setSelectedCategory(event.currentTarget.id);
    (async () => {
      exerciceDispatcher({
        type: 'FETCH_CATEGORY',
        payload: (await axios.get(`/api/category/${event.currentTarget.id}`)).data,
      });
    })();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Container maxWidth="md" component="main" className={classes.container}>
        {selectedCategory && <div>selected cat</div>}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="center">
            {!exercices.selected && !selectedCategory && (
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
                      direction="row"
                      justify="center"
                      className={classes.categories}
                      spacing={3}
                    >
                      {exercices.categories.map((category) => {
                        return (
                          <Grid item xs={6} key={category}>
                            <Button
                              variant="outlined"
                              className={classes.categoryContainer}
                              id={category}
                              onClick={clickCategory}
                            >
                              {traduceCategories(category)}
                            </Button>
                          </Grid>
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
        <Box mt={4}>
          <Navigation settings={0} />
        </Box>
      </footer>
    </div>
  );
}
