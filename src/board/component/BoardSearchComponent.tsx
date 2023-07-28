import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import useBoardStore from '../../store/BoardStore';
import { searchBoard } from '../../api/BoardApi';


const gridStyle: React.CSSProperties = {
  paddingLeft: '13px',
};

export default function BoardSearchComponent() {
  const [category, setCategory] = React.useState('');
  const setBoards = useBoardStore((state) => state.setBoards)
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const searchHandle = React.useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const data = await searchBoard('');
      console.log(data); // 확인용 로그
      setBoards(data);
    } catch (error) {
      console.error('Failed to search board:', error);
    }
  }, [setBoards]);
  
  return (
    <Container sx={{ marginLeft: '3.5rem' }}>
      <Grid container spacing={2} alignItems="left">
        <Grid item xs={3}>
          <FormControl variant="standard" sx={{ minWidth: 70, marginTop: '7px' }}>
            <InputLabel id="demo-simple-select-standard-label" sx={{ fontSize: '12px'}}></InputLabel>
            <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={category} onChange={handleChange} label="카테고리" sx={{ fontSize: '12px', backgroundColor: 'white'  }}>
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
            <IconButton onClick={searchHandle} type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
