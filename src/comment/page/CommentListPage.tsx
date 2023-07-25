import { Button, CircularProgress, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, createTheme } from '@mui/material'
import { green } from '@mui/material/colors';
import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteComment, fetchCommentList, updateComment, useCommentQueryList } from '../../api/CommentApi';
import useUserStore from '../../store/UserStore';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useQueryClient } from 'react-query';
import useCommentStore from '../../store/CommentStore';

interface RouteParams {
  commentId: string
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
  const { data: comments, isLoading, isError } = useCommentQueryList()
  const setComments = useCommentStore((state) => state.setComments)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const user = useUserStore((state)=> state.user)
  const { commentId } = useParams<RouteParams>()
  const comment = useCommentStore((state) => state.comment)

  
  const handleEditClick = () => {    
  };

  const handleDeleteClick = async () => {
    await deleteComment(commentId || ''); // 문자열로 전달
    queryClient.invalidateQueries('boardList');
    const result = window.confirm('정말로 삭제 하시겠습니까?');
    if (comment.writer === user.nickName) {
      if (result === true) {
        alert("삭제");
        navigate("/");
      } else {
        alert('취소');
      }
  }
}
  

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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='md' sx={{mt: '3px'}}>
        <TableContainer component={Paper}>
          <Table aria-label='board table'>
            <TableHead>
              <TableRow>                
                <TableCell align='center' style={{ width: '50%' }}/>
                <TableCell align='center' style={{ width: '20%' }}/>
                <TableCell align='center' style={{ width: '20%' }}/>                
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
        {/* 첫 번째 행 - writer와 createDate 표시 */}
        <TableRow style={{ cursor: 'pointer' }}>
          <TableCell align='left' sx={{ fontSize: '14px' }}>{comment.writer} <PersonIcon fontSize='inherit'/> </TableCell>
          <TableCell/>
          <TableCell align='right' sx={{ fontSize: '14px' }}>{comment.createDate} <AccessTimeIcon fontSize='inherit'/></TableCell>
        </TableRow>
        {/* 두 번째 행 - content 표시 */}
        <TableRow style={{ cursor: 'pointer' }}>
          <TableCell align='left' sx={{ fontSize: '14px' }}>{comment.content} </TableCell>
          <TableCell/>
          <TableCell align='right'>
            <Button onClick={handleEditClick} sx={{fontSize: '11.5px'}} >수정</Button>
            <Button onClick={handleDeleteClick} color='error' sx={{fontSize: '11.5px'}} >삭제</Button> 
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