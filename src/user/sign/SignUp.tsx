import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, FormControl, FormControlLabel, Checkbox, FormHelperText, Grid, Box, Typography, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { green } from '@mui/material/colors';
import springAxiosInst from '../../utility/axiosInstance';
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

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
    primary: {
      main: green['500'],
    },
  },
});
interface JoinData {
  nickName: string;
  name: string;
  email: string;
  password: string;
  rePassword: string;
}


const SignUp = () => {

  const [checked, setChecked] = useState(false);
  const [nickNameError, setNickNameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registerError] = useState('');
  const [googleLogin, setGoogleLogin] = useState({ uid: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      setGoogleLogin({ uid: auth.currentUser.uid, email: auth.currentUser.email || '' });
      signOut(auth);
    }

  }, []);

  const handleAgree = (event: any) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData: JoinData = {
      nickName: data.get('nickName') as string,
      name: data.get('name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      rePassword: data.get('rePassword') as string,
    };
    const { nickName, email, name, password, rePassword } = joinData;

    const nickNameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nickNameRegex.test(nickName)) setNickNameError('띄어쓰기, 특수문자는 넣을 수 없습니다.');
    else setNickNameError('');

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
      (
        nickNameRegex.test(nickName) &&
        nameRegex.test(name) &&
        emailRegex.test(email) &&
        passwordRegex.test(password) &&
        password === rePassword &&
        checked
      )
      ||
      (
        nickNameRegex.test(nickName) &&
        nameRegex.test(name) &&
        googleLogin.email
      )
    ) {
      onhandlePost(joinData);
    }
  };

  const onhandlePost = async (data: any) => {
    const { nickName, name, email, password } = data;

    try {
      const result = await springAxiosInst.post<String[]>('/user/sign-validate', { nickName, email });
      if (result.data.length > 0) {
        if (result.data.includes('email')) {
          alert('이미 회원가입되어있습니다.');
        }
        if (result.data.includes('nickName')) {
          alert('중복된 닉네임입니다.');
        }
        return;
      }
      let uid = googleLogin.uid;
      if (!uid) {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        uid = userCredential.user.uid;
      }
      const postData = { nickName, name, email, uid };
      const response = await springAxiosInst.post('/user/sign-up', postData);
      console.log(response, '성공');
      navigate('/key-we-board-page/sign-in');

    } catch (error) {
      const err = error as FirebaseError;
      console.log(err.message);
      if (err.message.includes('auth/email-already-in-use')) {
        alert('이미 회원가입되어있습니다.');
      } else {
        alert('서버 에러입니다.');
      }
      //setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Avatar sx={{ m: 1, bgcolor: '#6BB07B' }} />
          <Typography component="h1" variant="h5"> {googleLogin.uid && '구글 '}회원가입 </Typography>
          <Boxs component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField autoFocus required fullWidth id="nickName" name="nickName" label="별명" error={nickNameError !== '' || false} />
                </Grid>
                <FormHelperTexts>{nickNameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField required fullWidth id="name" name="name" label="이름" error={nameError !== '' || false} />
                </Grid>
                <FormHelperTexts>{nameError}</FormHelperTexts>
                {
                  googleLogin.uid ?
                    <Grid item xs={12}>
                      <TextField required fullWidth disabled type="email" id="email" name="email" label="이메일" value={googleLogin.email} error={emailError !== '' || false} />
                    </Grid>
                    :
                    <>
                      <Grid item xs={12}>
                        <TextField required fullWidth type="email" id="email" name="email" label="이메일" error={emailError !== '' || false} />
                      </Grid>
                      <FormHelperTexts>{emailError}</FormHelperTexts>
                      <Grid item xs={12}>
                        <TextField required fullWidth type="password" id="password" name="password" label="비밀번호 (숫자+영문자+특수문자 8자리 이상)" error={passwordState !== '' || false} />
                      </Grid>
                      <FormHelperTexts>{passwordState}</FormHelperTexts>
                      <Grid item xs={12}>
                        <TextField required fullWidth type="password" id="rePassword" name="rePassword" label="비밀번호 재입력" error={passwordError !== '' || false} />
                      </Grid>
                      <FormHelperTexts>{passwordError}</FormHelperTexts>
                    </>
                }
                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox onChange={handleAgree} sx={{ color: green["500"] }} />} label="회원가입 약관에 동의합니다." />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: "#6BB07B", color: 'white' }} size="large"> 회원가입 </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;