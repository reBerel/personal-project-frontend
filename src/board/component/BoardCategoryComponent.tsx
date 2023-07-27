// BoardCategoryComponent.tsx
import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Paper } from '@mui/material';

interface BoardCategoryComponentProps {
  onFilterChange: (boardCategory: string) => void;
}

const filterOptions = ['All', 'Spring', 'Python', 'Vue', 'React', 'Question'];

const BoardCategoryComponent: React.VFC<BoardCategoryComponentProps> = ({ onFilterChange }) => {
  const [value, setValue] = React.useState('All');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    onFilterChange(newValue.toLowerCase());
  };

  return (
    <Box>
      <BottomNavigation showLabels value={value} onChange={handleChange} sx={{ height: '2.5rem', marginBottom: '5px' }} component={Paper}>
        {filterOptions.map(option => (
          <BottomNavigationAction key={option} value={option} label={option} />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default BoardCategoryComponent;
