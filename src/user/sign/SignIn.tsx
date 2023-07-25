import { Box, Button, Container, Grid, Link, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import { green } from '@mui/material/colors';
import React, { useState } from 'react'
import { browserLocalPersistence, browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from 'firebase/app';

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
    primary: {
      main: green['500'],
    },
  },
});

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [isAuto, setIsAuto] = useState<boolean>(false)

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.currentTarget.value);
  }

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.currentTarget.value)
  }

  const onClickSignIn = async () => {
    console.log('click sign-in')
    console.log('Email: ', inputEmail)
    console.log('Password: ', inputPassword)
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
      console.log(userCredential);

    } catch (error) {
      const err = error as FirebaseError;
      console.log(err.message);
      if (err.message.includes('auth/invalid-email')) {
        alert('이메일이 없습니다.');
      } else if (err.message.includes('auth/invalid-password')) {
        alert('비밀번호가 틀렸습니다.');
      } else {
        alert('서버 에러입니다.');
      }
    }
  }

  const onClickGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await setPersistence(auth, isAuto ? browserLocalPersistence : browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      alert('서버 에러입니다.');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs" style={{ marginTop: "30px" }}>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}> 로그인 </Typography>
        <Box display="flex" flexDirection="column" >
          <TextField autoFocus id='email' name='email' label="아이디" sx={{ p: 0.8 }} value={inputEmail} onChange={handleInputEmail} />
          <TextField type="password" id='password' name='password' label="비밀번호" sx={{ p: 0.8 }} value={inputPassword} onChange={handleInputPassword} />
          <div>
            <input type="checkbox" onChange={(e) => { setIsAuto(e.currentTarget.checked); console.log(e.currentTarget.checked); }} /><span>자동로그인</span>
          </div>
          <Button onClick={onClickSignIn} style={{ marginTop: "20px" }} variant="contained" sx={{ backgroundColor: "#6BB07B", color: 'white' }} >로그인</Button>
          <Button onClick={onClickGoogleSignIn} style={{ marginTop: "20px" }} variant="contained" sx={{ backgroundColor: "#198eee", color: 'white' }} >구글 로그인</Button>
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
      </Container>
    </ThemeProvider>
  )
}

export default SignIn