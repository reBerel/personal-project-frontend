import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useState } from 'react'
import useUserStore from '../../store/UserStore'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: ' 10px',
          marginBottom: '1rem'
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#6BB07B',
    },
  },
});

const UserProfile = () => {
  const user = useUserStore((state) => state.user)
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleChange = () => {
    navigate(`/key-we-board-page/info/${user.uid}`)
  }
  const deleteHandleprofile = async () => {
    const resuit = window.confirm('정말로 탈퇴 하시겠습니까?')
    if (resuit === true) {
      alert("회원탈퇴 페이지로 이동합니다.")
      navigate(`/key-we-board-page/profile/delete/${user.uid}`)
    } else {
      alert("취소 되었습니다.")
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
        <Typography align='center' component="h1" variant="h5" sx={{ color: '#6BB07B' }}> <AssignmentIndIcon /> 프로필</Typography>
        <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
          <Table aria-label='board table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{ fontSize: '16px', mb: '1rem' }}>닉네임: {user.nickName} </TableCell>
                {/* <Button onClick={handleChange}>변경</Button> */}
              </TableRow>
              <TableRow>
                <TableCell align='center' sx={{ fontSize: '16px', mb: '1rem' }}>이름: {user.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' sx={{ fontSize: '16px', mb: '1rem' }}>이메일: {user.email || '구글 이메일입니다.'}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <Button color='error' component={Paper} variant='outlined' sx={{ backgroundColor: "#ffffff", marginTop: '0.5rem', textAlign: 'center', width: '100%' }} onClick={deleteHandleprofile}>회원탈퇴</Button>
      </Container>
    </ThemeProvider>
  )
}

export default UserProfile