import { Box, Button, Card, Container, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react';
import useUserStore from '../../store/UserStore';
import CommentListPage from './CommentListPage';

const CommentPage = () => {
  const [showButton, setShowButton] = useState(false);
  const [isTextFieldActive, setIsTextFieldActive] = useState(false);
  const user = useUserStore((state) => state.user);

  const handleTextFieldClick = () => {
    setIsTextFieldActive(true);
    setShowButton(true);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'> 댓글작성 </TableCell>
              <TableCell align='left'>닉네임: {user.nickName} </TableCell>
              <TableCell width="75%" />
            </TableRow>
          </TableHead>
        </Table>
        <Box display="flex" alignItems="center">
          <Grid container alignItems="center">
            <Grid item xs>
              <TextField onClick={handleTextFieldClick} multiline minRows={2} maxRows={5} sx={{ width: '100%' }} />
              {isTextFieldActive && showButton && <Button>작성</Button>}
            </Grid>
          </Grid>
        </Box>
      </TableContainer>
      <CommentListPage/>
    </Container>
  );
};

export default CommentPage;
