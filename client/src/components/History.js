import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

import { LogsContext } from '../context/LogsContext';
import { DispatchContext } from '../context/LogsContext';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

import Navigation from './Navigation';
import Header from './Header';

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
}));

export default function History() {
  const classes = useStyles();
  const history = useHistory();
  const logs = useContext(LogsContext);
  const logsDispatcher = useContext(DispatchContext);

  useEffect(() => {
    (async () => {
      try {
        logsDispatcher({
          type: 'FETCH_LOGS',
          payload: (await axios.get('/api/logs')).data,
        });
      } catch (error) {
        logsDispatcher({
          type: 'FETCH_ERROR',
          payload: error.response.data.errors,
        });
      }
    })();
  }, []);

  console.log(logs.logs);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header/>
      <Container maxWidth="md" component="main" className={classes.container}>
        <Timeline align="alternate">
          {logs.logs.map((log) => {
            const date = new Date(log.date);
            return (
              <TimelineItem key={log.id}>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Container>
      <footer className={classes.footer}>
        <Box mt={8}>
          <Navigation settings={1} />
        </Box>
      </footer>
    </div>
  );
}
