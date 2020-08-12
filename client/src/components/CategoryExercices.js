import React, { useContext } from 'react';
import { traduceCategories, beautifyName } from '../helpers';
import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LabelIcon from '@material-ui/icons/Label';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Header from './Header';
import Navigation from './Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    padding: theme.spacing(3, 2, 2, 2),
  },
  footer: {
    marginTop: 'auto',
  },
}));

export default function CategoryExercices() {
  const classes = useStyles();
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);
  const history = useHistory();

  const selectExercice = (exercice) => () => {
    history.push('/logs');
    exerciceDispatcher({
      type: 'SELECT_EXERCICE',
      payload: exercice,
    });
  };

  const goBack = () => {
    history.push('/logs');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header
        currentPage={traduceCategories(exercices.exercicesByCategory.category)}
        navigation={true}
        goBack={goBack}
      />
      <Container maxWidth="md" component="main" className={classes.container}>
        <Slide direction="left" in={true}>
          <Grid container justify="center" spacing={3}>
            {exercices.loading ? (
              <CircularProgress />
            ) : (
              <>
                <Grid item xs={12}>
                  <List aria-labelledby="nested-list-subheader">
                    {exercices.exercicesByCategory.exercices.map((exercice) => {
                      const [beautifiedExercice] = beautifyName([exercice]);
                      return (
                        <ListItem
                          button
                          key={exercice.name}
                          onClick={selectExercice(exercice)}
                        >
                          <ListItemIcon>
                            <LabelIcon />
                          </ListItemIcon>
                          <ListItemText primary={beautifiedExercice.name} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
              </>
            )}
          </Grid>
        </Slide>
      </Container>
      <footer className={classes.footer}>
        <Box mt={8}>
          <Navigation settings={0} />
        </Box>
      </footer>
    </div>
  );
}
