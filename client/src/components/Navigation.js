import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import HistoryIcon from '@material-ui/icons/History';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AppBar from '@material-ui/core/AppBar';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  navigation: {
    backgroundColor: '#ffffff',
  },
  selected: {
    color: '#1a4971',
    '&$selected': {
      color: '#1a4971',
    },
  },
}));

export default function Navigation({ settings }) {
  const history = useHistory();
  const classes = useStyles();
  const [menu, setMenu] = useState(settings);

  const navigate = (event) => {
    if (event.currentTarget.name === 'register') {
      setMenu(0);
      history.push('/logs');
    } if (event.currentTarget.name === 'home') {
      setMenu(1);
      history.push('/home');
    } else {
      setMenu(2);
      history.push('/history');
    }
  };
  return (
    <AppBar
      color="default"
      position="fixed"
      className={classes.appBar}
    >
      <BottomNavigation value={menu} showLabels className={classes.navigation}>
        <BottomNavigationAction
          label="Registros"
          name="register"
          icon={<BookmarkIcon />}
          onClick={navigate}
          classes={{
            root: classes.root,
            selected: classes.selected,
          }}
        />
        <BottomNavigationAction
          label="Home"
          name="home"
          icon={<HistoryIcon />}
          onClick={navigate}
          classes={{
            root: classes.root,
            selected: classes.selected,
          }}
        />
        <BottomNavigationAction
          label="Histórico"
          name="historic"
          icon={<HistoryIcon />}
          onClick={navigate}
          classes={{
            root: classes.root,
            selected: classes.selected,
          }}
        />
      </BottomNavigation>
    </AppBar>
  );
}
