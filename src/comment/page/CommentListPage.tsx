import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, createTheme } from '@mui/material'
import { green } from '@mui/material/colors';
import React,{useState} from 'react'
import { ThemeProvider } from 'styled-components'
import { useParams } from 'react-router-dom';
import { deleteComment, updateComment } from '../../api/CommentApi';
import useUserStore from '../../store/UserStore';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useQueryClient } from 'react-query';
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

const CommentListPage = ({comments}:{comments:Comment[]}) => {
  const { boardId } = useParams<RouteParams>()
  const queryClient = useQueryClient()
  const user = useUserStore((state) => state.user)
  const [editComment, setEditComment] = useState<Comment>({} as Comment);

  const handleEditClick = async(comment: Comment) => {
    if(editComment.commentId===comment.commentId) {
      await updateComment(editComment);
      queryClient.invalidateQueries(['board', boardId]);
      setEditComment({} as Comment);
      alert("수정");
    } else {
      setEditComment(comment)
    }
  };

  const handleDeleteClick = async (comment: Comment) => {
    const result = window.confirm('정말로 삭제 하시겠습니까?');
    console.log(comment, user.nickName)
    if (comment.writer === user.nickName) {
      if (result === true) {
        await deleteComment(comment.commentId);
        queryClient.invalidateQueries(['board', boardId]);
        alert("삭제");
      } else {
        alert('취소');
      }
    } else {
      alert("에러입니다.")
    }
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
                comments?.map((comment: Comment) => (
                  <React.Fragment key={comment.commentId}>
                    <TableRow style={{ cursor: 'pointer' }}>
                      <TableCell align='left' sx={{ fontSize: '14px' }}>{comment.writer} <PersonIcon fontSize='inherit' /> </TableCell>
                      <TableCell />
                      <TableCell align='right' sx={{ fontSize: '14px' }}>{comment.createDate} <AccessTimeIcon fontSize='inherit' /></TableCell>
                    </TableRow>
                    <TableRow style={{ cursor: 'pointer' }}>
                      {
                        editComment.commentId!==comment.commentId?
                        <TableCell align='left' sx={{ fontSize: '14px' }}>{comment.content} </TableCell>
                        :
                        <TextField 
                        disabled={false} 
                        onChange={(e)=>{setEditComment((cmt)=>({...cmt, content:e.target.value}))}}
                        value={editComment.content} multiline minRows={1} maxRows={5} sx={{ width: '100%' }} />
                      }
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