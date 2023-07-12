import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Grid, ThemeProvider, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';


import {Search, SearchIconWrapper, StyledInputBase, AppBar } from './NavigationComponent'
import {  } from '@mui/material/colors';
import NavigationSideBar from './NavigationSideBar';

export default function NavigationBar() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
 
      <AppBar position="static" sx={{ backgroundColor: '#6BB07B' }}>
        <Toolbar>          
        <Grid container spacing={1} sx={{marginTop: '10px'}}>
        <Grid item xs={2}>  
          <Box/>
          </Grid>
        <Grid item xs={2}>  
          <Typography color='white' variant="h6" component={Link} to="/key-we-board-page/list" style={{ textDecoration: "none" }}>
            KeyWe |
          </Typography>
          </Grid>
          <Grid item xs={3.7}>  
          <Box/>
          </Grid>
          <Search>
            <SearchIconWrapper />            
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} sx={{padding: '5px'}}/>
          </Search>          
            <Grid item xs={1.6}>
          <Button component={Link} to="/key-we-board-page/sign-in" color="inherit">로그인</Button>                    
          </Grid>
          <Grid item xs={0.5}>  
          <NavigationSideBar/>
          </Grid>
          <Grid item xs={2}>  
          <Box/>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>           
    </ThemeProvider>
  );
}
