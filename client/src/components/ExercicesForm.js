import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { traduceCategories } from '../helpers';

import useInputState from '../hooks/useInputState';
import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';

import { useHistory } from 'react-router-dom';
import Navigation from './Navigation';

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(2),
  },
  error: {
    marginTop: theme.spacing(5),
  },
  okButton: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
    marginRight: theme.spacing(3),
    width: '120px',
  },
  cancelButton: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
    width: '120px',
  },
  buttonContainer: {
    marginTop: theme.spacing(3),
  },
}));

export default function ExercicesForm() {
  const classes = useStyles();
  const history = useHistory();
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);
  const [value, handleChange, reset] = useInputState({
    name: '',
    category: '',
  });

  const clear = () => {
    exerciceDispatcher({
      type: 'RESET',
    });
  };

  const cancel = () => {
    history.push('/logs');
  };

  useEffect(() => {
    (async () => {
      exerciceDispatcher({
        type: 'FETCH_CATEGORIES',
        payload: (await axios.get('/api/categories')).data,
      });
    })();
  }, []);

  const saveLog = async () => {
    try {
      await axios.post('/api/exercice', value);
      history.push('/logs');
    } catch (error) {
      exerciceDispatcher({
        type: 'FETCH_ERROR',
        payload: ['Este ejercicio ya existe en nuestra base de datos'],
      });
      reset();
    }
  };

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
              Crea un Ejercicio
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" component="main" className={classes.container}>
        {exercices.error ? (
          <Fade in={exercices.error ? true : false} timeout={1000}>
            <Grid container>
              <Grid item xs={12}>
              
              </Grid>
            </Grid>
          </Fade>
        ) : (
          <Slide direction="up" in={true}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Nombre del Ejercicio"
                  name="name"
                  autoComplete="off"
                  value={value.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Categoria"
                  fullWidth
                  autoComplete="off"
                  name="category"
                  required
                  select
                  value={value.category}
                  onChange={handleChange}
                >
                  {exercices.categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {traduceCategories(category)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.buttonContainer}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.okButton}
                  startIcon={<SaveAltIcon />}
                  onClick={saveLog}
                >
                  Guardar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.cancelButton}
                  startIcon={<ClearIcon />}
                  onClick={cancel}
                >
                  Atras
                </Button>
              </Grid>
            </Grid>
          </Slide>
        )}
      </Container>
      <footer className={classes.footer}>
        <Box mt={8}>
          <Navigation settings={0} />
        </Box>
      </footer>
    </div>
  );
}
