import { Box, Button, Container, Grid, Link, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import { green } from '@mui/material/colors';
import React from 'react'

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: ' 10px'
        },
      },
    },    
  },
  palette: {
    primary:{
      main: green['500'],
    },
  },
});

const SignIn = () => {


  
  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="xs"  style={{ marginTop: "30px" }}>
      <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}> 로그인 </Typography>
    <Box display="flex" flexDirection="column">
       <TextField autoFocus label="아이디" sx={{p:0.8}}></TextField>
       <TextField label="비밀번호" sx={{p:0.8}}></TextField>    
       <Button style={{marginTop: "20px"}} variant="contained" sx={{backgroundColor:"#6BB07B", color: 'white'}} >로그인</Button>
       </Box >
       <Grid container>
            <Grid item xs marginTop='10px'>
       <Link href="/key-we-board-page/sign-up" underline="none" fontSize="13px">아이디/비밀번호 찾기</Link>
       </Grid>
       <Grid item>
        <Box marginTop="10px">
       <Link href="/key-we-board-page/sign-up" underline="none" fontSize="13px">회원가입하기</Link>
       </Box>
       </Grid>
       
       </Grid>
       {/* oauth 자리 */}
    </Container>
    </ThemeProvider>
  )
}

export default SignIn