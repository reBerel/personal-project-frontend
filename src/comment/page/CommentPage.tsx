import { Box, Button, Card, Container, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react';
import useUserStore from '../../store/UserStore';
import { useMutation, useQueryClient } from 'react-query';
import { registerComment } from '../../api/CommentApi';

const CommentPage = () => {
  const [showButton, setShowButton] = useState(false);
  const [isTextFieldActive, setIsTextFieldActive] = useState(false);
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const mutation = useMutation(registerComment, {
    onSuccess: (data) => {
      queryClient.setQueryData('comment', [data]); // 데이터를 배열로 전달
    },
  });

  const handleTextFieldClick = () => {
    setIsTextFieldActive(true);
    setShowButton(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const target = event?.target as typeof event.target & {
      elements: {
        writer: { value: string };
        content: { value: string };
      };
    };
    const {  content } = target.elements;
    const data = {
      writer: user.nickName, // 닉네임을 사용자의 nickName으로 설정
      content: content.value,
    };
    await mutation.mutateAsync(data);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '0.3rem' }}>
      <form onSubmit={handleSubmit}>
        <TableContainer component={Card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" width="10%">댓글작성</TableCell>
                <TableCell align="left" width="50%"> <span data-nickname={user.nickName}>닉네임: {user.nickName}</span> </TableCell>
                <TableCell width="40%" />
              </TableRow>
            </TableHead>
          </Table>
          <Box display="flex" alignItems="center">
            <Grid container alignItems="center">
              <Grid item xs>
                <TextField name="content" onClick={handleTextFieldClick} multiline minRows={2} maxRows={5} sx={{ width: '100%' }} />
                {isTextFieldActive && showButton && <Button type="submit">작성</Button>}
              </Grid>
            </Grid>
          </Box>
        </TableContainer>
      </form>
    </Container>
  );
};

export default CommentPage;
