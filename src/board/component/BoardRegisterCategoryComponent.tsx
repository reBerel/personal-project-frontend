import React from 'react';
import { Container } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const BoardRegisterCategoryComponent = () =>{
  const [category, setCategory] = React.useState('');  
  const handleChange = (event: SelectChangeEvent) => {
  setCategory(event.target.value);
  }    
  return (
    <Container sx={{ top: '1.3rem' }}>
      <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <InputLabel id="category">카테고리</InputLabel>
        <Select labelId="category" id="demo-simple-select-standard" value={category} onChange={handleChange} label="category">
          <MenuItem value={1}>All</MenuItem>
          <MenuItem value={2}>Spring</MenuItem>
          <MenuItem value={3}>Python</MenuItem>
          <MenuItem value={4}>Vue</MenuItem>
          <MenuItem value={5}>React</MenuItem>
          <MenuItem value={6}>Question</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
};

export default BoardRegisterCategoryComponent;
