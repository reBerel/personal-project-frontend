import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';


const gridStyle: React.CSSProperties = {
  paddingLeft: '13px',
};

export default function BoardSearchComponent() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <Container sx={{marginLeft: '3.5rem'}}>
      <Grid container spacing={2} alignItems="left">
        <Grid item xs={3}>
          <FormControl variant="standard" sx={{ minWidth: 70, marginTop: '7px' }}>
            <InputLabel id="demo-simple-select-standard-label" sx={{ fontSize: '12px' }}>카테고리</InputLabel>
            <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={category} onChange={handleChange} label="카테고리" sx={{ fontSize: '12px' }}>
              <MenuItem value=""><em>없음</em></MenuItem>
              <MenuItem value={10}>제목</MenuItem>
              <MenuItem value={20}>작성자</MenuItem>
              <MenuItem value={30}>작성일</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9} style={gridStyle}>
          <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: 200, height: 24, marginTop: 3, fontSize: '10px' }}>
            <InputBase sx={{ ml: 1, flex: 1 }} inputProps={{ 'aria-label': '' }} />
            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
