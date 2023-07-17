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
    <div>
      <Container  >
        <FormControl variant="standard" sx={{ minWidth: 80 }}>
          <InputLabel id="demo-simple-select-standard-label" sx={{ fontSize: '12px' }}>전체</InputLabel>
          <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={category} onChange={handleChange} label="전체">
            <MenuItem value=""> <em>전체</em> </MenuItem>
            <MenuItem value={10}>제목</MenuItem>
            <MenuItem value={20}>작성자</MenuItem>
            <MenuItem value={30}>작성일</MenuItem>
          </Select>
        </FormControl>
      </Container>
    </div>
  );
}