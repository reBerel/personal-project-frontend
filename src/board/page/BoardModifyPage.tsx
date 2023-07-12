import { Box, Button, Container, Grid, TextField, ThemeProvider, createTheme } from '@mui/material'
import React, { useState } from 'react'
import { green } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { deleteBoard, useBoardQuery, useBoardUpdateMutation } from '../../api/BoardApi';

interface RouteParams {
  boardId: string
  [key: string]: string
}

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
    primary:{
      main: green['500'],
    },
  },
});

const BoardModifyPage = () => {

  const navigate = useNavigate()
  const {boardId} = useParams<RouteParams>()
  const numericBoardId = Number(boardId)

  const queryClient = useQueryClient()

  const { data: board, isLoading, isError } = useBoardQuery(boardId || '')
  const mutation = useBoardUpdateMutation()

  const [title, setTitle] = useState(board?.title || '')
  const [content, setContent] = useState(board?.content || '')

  const handleEditFinishClick = async () => {
    const { writer } = board || {};
    console.log('수정 완료?');
  
    if (title && content && writer) {
      const updateData = {
        boardId: numericBoardId,
        title,
        content,
        writer,
        createDate: '',
        modifyDate: '',
        likeCount: 0,
        readCount: 0,
        replyCount: 0,
      };
      
      await mutation.mutateAsync(updateData);
      
      

      queryClient.invalidateQueries(['board', boardId]);
      navigate(`/key-we-board-page/read/${boardId}`);
    }    
  }
    const handleDeleteClick = async() => {
      await deleteBoard(boardId || '')
      queryClient.invalidateQueries('boardList')
      const resuit = window.confirm('정말로 삭제 하시겠습니까?')

      if (resuit == true) {
        alert("삭제")
      }else{
        alert('취소')
      }
    }
  
    const handleCancelClick = () => {
      navigate(`/key-we-board-page/read/${boardId}`)
  }

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
    <TextField disabled label="작성자" name="writer" sx={{ borderRadius: '4px' }}/>          
      <Box display='contents'> </Box>
        <Box display="flex" flexDirection="column" >
        <TextField label="제목" name="title" sx={{ borderRadius: '10px' }} onChange={(e) => setTitle(e.target.value)}/>            
        <TextField label="내용" name="content" multiline minRows={20} maxRows={20} sx={{ borderRadius: '4px' }} onChange={(e) => setContent(e.target.value)}/>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={1}>
      <Button variant='outlined' onClick={ handleDeleteClick } color='error' >삭제</Button>
      </Grid>
      <Grid item xs={8}>
      <Box/>
      </Grid >
      <Grid item xs={3}>        
      <Button variant='outlined' onClick={ handleCancelClick }>돌아가기</Button>
      <Button variant='outlined' onClick={ handleEditFinishClick }>수정완료</Button>
      </Grid >   
      </Grid>
    </Container>
  </ThemeProvider>
  )
}

export default BoardModifyPage

