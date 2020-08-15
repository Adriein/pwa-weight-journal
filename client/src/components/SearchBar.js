import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

import useDebounce from '../hooks/useDebounce';

const useStyles = makeStyles((theme) => ({
  panel: {
    width: '340px',
    padding: theme.spacing(1, 1, 1, 1),
    backgroundColor: '#ffffff',
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const searchTerm = useDebounce(value, 500);
  const exerciceState = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);

  useEffect(() => {
    if (searchTerm !== '' && searchTerm !== undefined) {
      exerciceDispatcher({
        type: 'LOADING',
      });
      setOpen(true);
      (async () => {
        try {
          exerciceDispatcher({
            type: 'FETCH_EXERCICES',
            payload: (await axios.get(`/api/exercices/${searchTerm}`)).data,
          });
        } catch (error) {
          exerciceDispatcher({
            type: 'FETCH_ERROR',
            payload: error.response.data.errors,
          });
        }
      })();
    }
  }, [searchTerm]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (exercice) => (event) => {
    exerciceDispatcher({
      type: 'SELECT_EXERCICE',
      payload: exercice,
    });
    setValue('');
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <TextField
        autoComplete="off"
        id="search-bar"
        variant="outlined"
        placeholder="Ejercicio..."
        value={value}
        onChange={handleChange}
        fullWidth
      />

      <Popover
        id="sub-menu"
        open={open}
        anchorEl={document.getElementById('search-bar')}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {exerciceState.loading ? (
          <Grid container justify="center" className={classes.panel}>
            <CircularProgress />
          </Grid>
        ) : (
          <List aria-label="exercices display" className={classes.panel}>
            {exerciceState.error ? (
              <ListItem>
                <ListItemText primary={exerciceState.error} />
              </ListItem>
            ) : (
              exerciceState.exercices.map((exercice, index) => {
                return (
                  <React.Fragment key={exercice.id}>
                    <ListItem button onClick={handleSelect(exercice)}>
                      <ListItemText primary={exercice.name} />
                    </ListItem>
                    {index !== exerciceState.exercices.length - 1 ? (
                      <Divider />
                    ) : null}
                  </React.Fragment>
                );
              })
            )}
          </List>
        )}
      </Popover>
    </>
  );
}
