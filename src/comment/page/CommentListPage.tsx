import { CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, createTheme } from '@mui/material'
import { green } from '@mui/material/colors';
import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import useCommentStore from '../../store/CommentStore';
import { useNavigate } from 'react-router-dom';
import { fetchCommentList, useCommentQueryList } from '../../api/CommentApi';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            padding: '5px 12px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '10px 15px'
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
  const { data: comments, isLoading, isError } = useCommentQueryList()
  const setComments = useCommentStore((state) => state.setComments)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCommentList()
      if (data) {
        setComments(data);       
      }
    }
    fetchData()
  }, [])
  if (isLoading) {
    return <CircularProgress />
  }
  if (isError) {
    return <Typography>댓글을 갖고오는 중 에러 발생!</Typography>
  }

  const ReadClick = (boardId: number) => {
    navigate(`/key-we-board-page/read/${boardId}`)
  }
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" style={{ marginTop: '3rem' }}>
        <TableContainer component={Paper}>
          <Table aria-label='board table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' style={{ width: '7%' }}>No.</TableCell>
                <TableCell align='center' style={{ width: '45%' }}>제목</TableCell>
                <TableCell align='center' style={{ width: '10%' }}>작성자</TableCell>
                <TableCell align='center' style={{ width: '20%' }}>작성일</TableCell>
                <TableCell align='center' style={{ width: '7%' }}>추천</TableCell>
                <TableCell align='center' style={{ width: '3%' }}>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments && comments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>현재 등록된 게시물이 없습니다.</TableCell>
                </TableRow>
              ) : (
                comments?.map((comment: any) => (
                  <TableRow key={comment.commentId} style={{ cursor: 'pointer' }}>
                    <TableCell align='center' sx={{ fontSize: '14px' }}>{comment.boardId}</TableCell>
                    <TableCell align='center' sx={{ fontSize: '14px' }}>{comment.writer}</TableCell>
                    <TableCell align='center' sx={{ fontSize: '14px' }}>{comment.content}</TableCell>
                    <TableCell align='center' sx={{ fontSize: '12px' }}>{comment.createDate}</TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default CommentListPage;
