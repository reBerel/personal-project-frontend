import { getAuth, deleteUser } from 'firebase/auth';
import { useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';
import { userDeleteHandler } from '../../api/UserApi';

const UserDelete = () => {
  const [checked, setChecked] = useState(false);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleDeleteCheck = (event: any) => {
    setChecked(event.target.checked);
  };

  const secession = async () => {
    const isSecession = window.confirm('탈퇴하시겠습니까?');
    if (!isSecession) return;

    try {
      const auth = getAuth();
      const authUser = auth.currentUser;
      console.log(authUser)

      if (authUser && user && user.uid) {
        await Promise.all([
          deleteUser(authUser),
          userDeleteHandler(user.uid)
        ]);
        alert('회원 탈퇴가 완료되었습니다.');
        navigate('/key-we-board-page/list');
      }
    } catch (error) {
      alert('회원 탈퇴 중에 오류가 발생했습니다.' + error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!checked) {
      alert('회원탈퇴 약관에 동의해주세요.');
      return;
    }
    secession();
  };

  return (
    <Container>
      <Typography component="h1" variant="h5" sx={{ color: '#6BB07B', mt: '3rem' }}>회원탈퇴 페이지</Typography>
      <Typography sx={{ mt: '1.5rem' }}>회원탈퇴입니다. 만약에 삭제하고 싶으시면 아래에 박스를 체크해주세요.</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <FormControlLabel control={<Checkbox onChange={handleDeleteCheck} sx={{ color: green['500'] }} />} label="회원탈퇴 약관에 동의합니다." />
        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 1.5, backgroundColor: '#6BB07B', color: 'white' }} size="large">회원탈퇴</Button>
      </Box>
    </Container>
  );
};

export default UserDelete;