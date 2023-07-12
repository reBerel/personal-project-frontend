import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Avatar, Button, CssBaseline, TextField, FormControl, FormControlLabel, Checkbox, FormHelperText, Grid, Box, Typography, Container, colors,} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { green } from '@mui/material/colors';
import springAxiosInst from '../../utility/axiosInstance';

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

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



const SignUp = () => {
const [checked, setChecked] = useState(false);
const [emailError, setEmailError] = useState('');
const [passwordState, setPasswordState] = useState('');
const [passwordError, setPasswordError] = useState('');
const [nameError, setNameError] = useState('');
const [registerError, setRegisterError] = useState('');
const navigate = useNavigate();

const handleAgree = (event: any) => {
  setChecked(event.target.checked);
};

const handleSubmit = (e: any) => {
  e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      nickName: data.get('nickName') as string,
      email: data.get('email') as string,
      name: data.get('name') as string,
      password: data.get('password') as string,
      rePassword: data.get('rePassword') as string,
    };
    const { nickName, email, name, password, rePassword } = joinData;

    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    else setPasswordState('');

    if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    if (!checked) alert('회원가입 약관에 동의해주세요.');

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&

      checked
    ) {
      onhandlePost(joinData);
    }
  };  

  const onhandlePost = async (data: any) => {
    const { email, name, password } = data;
    const postData = { email, name, password };
  
    try {
      const response = await springAxiosInst.post('/user/sign-up', postData);
      console.log(response, '성공');
      navigate('/key-we-board-page/sign-in');
    } catch (error) {
      console.log(error);
      setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Avatar sx={{ m: 1, bgcolor: '#6BB07B' }} />
          <Typography component="h1" variant="h5"> 회원가입 </Typography>
          <Boxs component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>   
            <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
            <Grid item xs={12}>
                  <TextField autoFocus required fullWidth id="nickName" name="nickName" label="별명" error={nameError !== '' || false} />
                </Grid>     
                <Grid item xs={12}>
                  <TextField required fullWidth id="name" name="name" label="이름" error={nameError !== '' || false} />
                </Grid>              
                <FormHelperTexts>{nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField required fullWidth type="email" id="email" name="email" label="이메일" error={emailError !== '' || false} />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField required fullWidth type="password" id="password" name="password" label="비밀번호 (숫자+영문자+특수문자 8자리 이상)" error={passwordState !== '' || false} />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField required fullWidth type="password" id="rePassword"name="rePassword" label="비밀번호 재입력" error={passwordError !== '' || false} />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>               
                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox onChange={handleAgree} sx={{ color: green["500"] }}/>}label="회원가입 약관에 동의합니다." />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor:"#6BB07B", color: 'white' }} size="large"> 회원가입 </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;