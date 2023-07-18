import React, { useState } from 'react';
import { Container } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface BoardRegisterCategoryComponentProps {
  category: string; // category 값을 받아올 prop 추가
  onChange: (value: string) => void; // category 변경 시 호출될 콜백 함수 prop 추가
}

const BoardRegisterCategoryComponent = ({ category, onChange }: BoardRegisterCategoryComponentProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value); // onChange 콜백 함수 호출하여 category 값 업데이트
  };

  return (
    <Container sx={{ top: '1.3rem' }}>
      <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <InputLabel id="category">카테고리</InputLabel>
        <Select labelId="category" id="demo-simple-select-standard" value={category} onChange={handleChange} label="category">
          <MenuItem value={10}>Main</MenuItem>
          <MenuItem value={20}>Spring</MenuItem>
          <MenuItem value={30}>Python</MenuItem>
          <MenuItem value={40}>Vue</MenuItem>
          <MenuItem value={50}>React</MenuItem>
          <MenuItem value={60}>Question</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
};

export default BoardRegisterCategoryComponent;
