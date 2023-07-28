import { Box, Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, createTheme } from '@mui/material'
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { useParams } from 'react-router-dom';
import { deleteComment, fetchCommentList, useCommentQueryList } from '../../api/CommentApi';
import useUserStore from '../../store/UserStore';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useQueryClient } from 'react-query';
import useCommentStore from '../../store/CommentStore';
import { Comment } from '../entity/Comment';

interface RouteParams {
  boardId: string
  [key: string]: string
}

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            padding: '2px 6px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '5px 10px'
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

const CommentListPage = () => {
  const { boardId } = useParams<RouteParams>()
  const parsedBoardId = boardId as unknown as number;
  const [commentList, setCommentList] = useState<any[]>([]);
  const { data: comments, isLoading, isError } = useCommentQueryList(parsedBoardId);
  const setComments = useCommentStore((state) => state.setComments)
  const queryClient = useQueryClient()
  const user = useUserStore((state) => state.user)

  const handleEditClick = (comment: Comment) => {
  };

  const handleDeleteClick = async (comment: Comment) => {
    await deleteComment(boardId || '');
    queryClient.invalidateQueries('boardList');
    console.log(queryClient.invalidateQueries('boardList'))
    const result = window.confirm('정말로 삭제 하시겠습니까?');
    console.log(comment, user.nickName)
    if (comment.writer === user.nickName) {
      if (result === true) {
        alert("삭제");
        window.location.reload();
      } else {
        alert('취소');
      }
    } else {
      alert("에러입니다.")
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      if (parsedBoardId !== undefined) {
        const data = await fetchCommentList(parsedBoardId);
        if (data) {
          setComments(data);
          setCommentList(data);
        }
      }
    };
    fetchData();
  }, [parsedBoardId])
  if (isLoading) {
    return <CircularProgress />
  }
  if (isError) {
    return <Typography>댓글을 갖고오는 중 에러 발생!</Typography>
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='md' sx={{ mt: '3px' }}>
        <TableContainer component={Paper}>
          <Table aria-label='board table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' style={{ width: '50%' }} />
                <TableCell align='center' style={{ width: '20%' }} />
                <TableCell align='center' style={{ width: '20%' }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {comments && comments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>현재 작성된 댓글이 없습니다.</TableCell>
                </TableRow>
              ) : (
                comments?.map((comment: any) => (
                  <React.Fragment key={comment.commentId}>
                    <TableRow style={{ cursor: 'pointer' }}>
                      <TableCell align='left' sx={{ fontSize: '14px' }}>{comment.writer} <PersonIcon fontSize='inherit' /> </TableCell>
                      <TableCell />
                      <TableCell align='right' sx={{ fontSize: '14px' }}>{comment.createDate} <AccessTimeIcon fontSize='inherit' /></TableCell>
                    </TableRow>
                    <TableRow style={{ cursor: 'pointer' }}>
                      <TableCell align='left' sx={{ fontSize: '14px' }}>{comment.content} </TableCell>
                      <TableCell />
                      <TableCell align='right'>
                        {comment.writer === user.nickName ? (
                          <React.Fragment>
                            <Button onClick={() => { handleEditClick(comment) }} sx={{ fontSize: '11.5px' }}>수정</Button>
                            <Button onClick={() => { handleDeleteClick(comment) }} color='error' sx={{ fontSize: '11.5px' }}>삭제</Button>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Box />
                            <Box />
                          </React.Fragment>
                        )}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default CommentListPage;