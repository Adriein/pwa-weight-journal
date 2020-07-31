import React from 'react';

import HistoryIcon from '@material-ui/icons/History';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookmarkIcon from '@material-ui/icons/Bookmark';


export default function Navigation() {
  return (
    <BottomNavigation value={0} showLabels>
      <BottomNavigationAction label="Registros" icon={<BookmarkIcon />} />
      <BottomNavigationAction label="Histórico" icon={<HistoryIcon />} />
    </BottomNavigation>
  );
}
