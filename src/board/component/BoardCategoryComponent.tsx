import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Paper } from '@mui/material';


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box>
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => { setValue(newValue); }} sx={{ height: '2.5rem', marginBottom: '5px'}} component={Paper}>
      <BottomNavigationAction label="Main"  />
        <BottomNavigationAction label="Spring"  />
        <BottomNavigationAction label="Pytion"  />
        <BottomNavigationAction label="Vue"  />
        <BottomNavigationAction label="React"  />
        <BottomNavigationAction label="Question"  />
      </BottomNavigation>
    </Box>
  );
}