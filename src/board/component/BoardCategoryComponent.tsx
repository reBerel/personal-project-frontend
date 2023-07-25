import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface BoardCategoryComponentProps {
  onChangeCategory: (category: string) => void;
}
const BoardCategoryComponent: React.FC<BoardCategoryComponentProps> = ({ onChangeCategory }) => {
  const [value, setValue] = React.useState('Main');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    onChangeCategory(newValue); // 선택한 카테고리를 전달하기 위해 프롭스 함수를 호출합니다.
  };

  return (
    <Box>
      <BottomNavigation showLabels value={value} onChange={handleChange} sx={{ height: '2.5rem', marginBottom: '5px' }} component={Paper}>
        <BottomNavigationAction value="Main" label="Main" />
        <BottomNavigationAction value="Spring" label="Spring" />
        <BottomNavigationAction value="Python" label="Python" />
        <BottomNavigationAction value="Vue" label="Vue" />
        <BottomNavigationAction value="React" label="React" />
        <BottomNavigationAction value="Question" label="Question" />
      </BottomNavigation>
    </Box>
  );
};

export default BoardCategoryComponent;
