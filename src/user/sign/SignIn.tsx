import { Box, Button, Container, Grid, Link, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import { green } from '@mui/material/colors';
import React, {  useState } from 'react'
import springAxiosInst from '../../utility/axiosInstance';
import { User } from '../entity/User';

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
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [user, setUser] = useState('')

  const handleInputEmail = (e: any) => {
    setInputEmail(e.target.value)
  }
  
  const handleInputPassword = (e: any) => {
    setInputPassword(e.target.value)
  }

  const onClickSignIn = () => {
    console.log('click sign-in')
    console.log('Email: ', inputEmail)
    console.log('Password: ', inputPassword)
    springAxiosInst.post('/user/sign-in', {
      user_Email: inputEmail,
      user_Password: inputPassword
    })
    .then(res => {
      const userData = res.data;
      setUser(userData);
      console.log(res);
      console.log('userData.email :: ',userData.email);
      console.log('userData.password :: ',userData.password);      
      if (userData.email === undefined) {
        console.log('======================',userData.password)
        alert('입력하신 email이 일치하지 않습니다')        
      } else if (userData.email === null) {
        console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
        alert('입력하신 비밀번호 가 일치하지 않습니다.')
      } else if (userData.email === inputEmail) {
        console.log('======================','로그인 성공')
        sessionStorage.setItem('email', inputEmail)
      }
      // document.location.href = '/key-we-board-page/sign-in'
    })
    .catch(error => {
      console.error(error);
    });
  }    
  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="xs"  style={{ marginTop: "30px" }}>
      <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}> 로그인 </Typography>
    <Box display="flex" flexDirection="column" >
       <TextField autoFocus id='email' name='email' label="아이디" sx={{p:0.8}} value={inputEmail} onChange={handleInputEmail}/>
       <TextField id='password' name='password' label="비밀번호" sx={{p:0.8}} value={inputPassword} onChange={handleInputPassword}/>
       <Button onClick={onClickSignIn} style={{marginTop: "20px"}} variant="contained" sx={{backgroundColor:"#6BB07B", color: 'white'}} >로그인</Button>
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