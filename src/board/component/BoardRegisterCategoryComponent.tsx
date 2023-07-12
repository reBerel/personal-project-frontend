import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Container } from '@mui/material';

export default function BoardRegisterCategoryComponent() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <Container>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="category">카테고리</InputLabel>
        <Select labelId="category" id="demo-simple-select-standard" value={category} onChange={handleChange} label="category">          
          <MenuItem value={10}>Main</MenuItem>
          <MenuItem value={20}>Spring</MenuItem>
          <MenuItem value={30}>Pytion</MenuItem>
          <MenuItem value={40}>Vue</MenuItem>
          <MenuItem value={50}>React</MenuItem>
          <MenuItem value={60}>Question</MenuItem>
        </Select>
      </FormControl>    
    </Container>
  );
}