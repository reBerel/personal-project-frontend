import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router';


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
  
    const handleChange = (event: any, newValue: any) => {
      setValue(newValue);
      navigateToCategory(newValue);
    };
  
    const navigateToCategory = (category: any) => {
      let path = '';
  
      switch (category) {
        case 0:
          path = '/main';
          break;
        case 1:
          path = '/spring';
          break;
        case 2:
          path = '/python';
          break;
        case 3:
          path = '/vue';
          break;
        case 4:
          path = '/react';
          break;
        case 5:
          path = '/question';
          break;
        default:
          break;
      }
  
      navigate(path);
    };
  
    return (
      <Box>
        <BottomNavigation showLabels value={value} onChange={handleChange} sx={{ height: '2.5rem', marginBottom: '5px' }} component={Paper}>
          <BottomNavigationAction label="Main" />
          <BottomNavigationAction label="Spring" />
          <BottomNavigationAction label="Python" />
          <BottomNavigationAction label="Vue" />
          <BottomNavigationAction label="React" />
          <BottomNavigationAction label="Question" />
        </BottomNavigation>
      </Box>
    );
  }
  