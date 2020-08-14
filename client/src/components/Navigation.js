import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import HistoryIcon from '@material-ui/icons/History';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookmarkIcon from '@material-ui/icons/Bookmark';

// const useStyles = makeStyles({
//   root: {
//     width: 500,
//   },
// });

export default function Navigation({ settings }) {
  const history = useHistory();
  const [menu, setMenu] = useState(settings);

  const navigate = (event) => {
    if (event.currentTarget.name === 'register') {
      setMenu(0);
      history.push('/logs');
    } else {
      setMenu(1);
      history.push('/history');
    }
  };
  return (
    <BottomNavigation value={menu} showLabels>
      <BottomNavigationAction
        label="Registros"
        name="register"
        icon={<BookmarkIcon />}
        onClick={navigate}
      />
      <BottomNavigationAction
        label="Histórico"
        name="historic"
        icon={<HistoryIcon />}
        onClick={navigate}
      />
    </BottomNavigation>
  );
}
