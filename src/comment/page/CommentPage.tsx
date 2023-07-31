import { Box, Button, Card, Container, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react';
import useUserStore from '../../store/UserStore';
import { useMutation, useQueryClient } from 'react-query';
import { registerComment } from '../../api/CommentApi';
import useBoardStore from '../../store/BoardStore';
import { useParams } from 'react-router-dom';

const CommentPage = () => {
  const { boardId } = useParams();
  const [showButton, setShowButton] = useState(false);
  const [isTextFieldActive, setIsTextFieldActive] = useState(false);
  const user = useUserStore((state) => state.user);
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(registerComment, {
    onSuccess: (data) => {
      queryClient.setQueryData('comment', (prevData: any) => {
        if (prevData) {
          return [...prevData, data];
        }
        return [data];
      });
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
        boardId: { value: number };
      };
    };
    const { content } = target.elements;
    const data = {
      writer: user.nickName,
      content: content.value,
      userId: user.userId,
      boardId: boardId ? parseInt(boardId, 10) : 0,
    };
    if(data.content) await mutation.mutateAsync(data);
    queryClient.invalidateQueries(['board', boardId]);
    setContent('');
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
                {
                  user.uid ? (
                    <>
                      <TextField name="content" 
                        onClick={handleTextFieldClick} 
                        value={content}
                        onChange={(e)=>setContent(e.currentTarget.value)}
                        multiline minRows={2} maxRows={5} sx={{ width: '100%' }} />
                      {isTextFieldActive && showButton && <Button type="submit">작성</Button>}
                    </>
                  ) : (
                    <TextField disabled label="로그인 후 이용해 주세요" multiline minRows={2} maxRows={5} sx={{ width: '100%' }} />
                  )
                }
              </Grid>
            </Grid>
          </Box>
        </TableContainer>
      </form>
    </Container>
  );
};

export default CommentPage;
