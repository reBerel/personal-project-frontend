import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, ThemeProvider, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { Search, SearchIconWrapper, StyledInputBase, AppBar } from './NavigationComponent'
import '@mui/material/colors';
import NavigationSideBar from './NavigationSideBar';
import useUserStore from '../store/UserStore';
import { getAuth, signOut } from 'firebase/auth';

export default function NavigationBar() {
  const theme = useTheme();
  const user = useUserStore((state) => state.user);

  return (
    <ThemeProvider theme={theme}>

      <AppBar onClick={(event) => {event.stopPropagation()}} position="static" sx={{ backgroundColor: '#6BB07B' }}>
        <Toolbar>
          <Grid container spacing={1} sx={{ marginTop: '10px', maxWidth: '1200px', margin:'auto' }}>
            {/* <Grid item xs={1}>
              <Box />
            </Grid> */}
            <Grid item xs={3}>
              <Typography color='white' variant="h6" component={Link} to="/key-we-board-page/list" style={{ textDecoration: "none" }}>
                <img src="/assets/KEYWE.png" style={{height:'30px'}}/>
              </Typography>
            </Grid>
            {/* <Grid item xs={3.7}>
              <Box />
            </Grid> */}
            {/* <Search>
              <SearchIconWrapper />
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} sx={{ padding: '5px' }} />
            </Search> */}
            <Grid item xs={1} sx={{marginLeft:'auto'}}>
              {
                user.uid ?                  
                    <Button onClick={() => signOut(getAuth())} color="inherit">로그아웃</Button>                  
                  : <Button component={Link} to="/key-we-board-page/sign-in" color="inherit">로그인</Button>
              }
            </Grid>
            <Grid item xs={1}>
              <NavigationSideBar />
            </Grid>
            {/* <Grid item xs={2}>
              <Box />
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
