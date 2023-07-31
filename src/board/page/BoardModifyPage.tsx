import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { green } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { deleteBoard, useBoardQuery, useBoardUpdateMutation } from '../../api/BoardApi';
import useUserStore from '../../store/UserStore';
import useCkeditor from '../../hook/useCkeditor';

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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            padding: 0,
          },
          input: {
            padding: '0.5rem'
          },
          '& .MuiInputLabel-root': {
            fontSize: '14px',
            display: 'block',
            marginTop: '-0.3rem'
          },
          '& .MuiInputBase-input': {
            fontSize: '16px',
          },
          marginTop: '12px'
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

const BoardModifyPage = () => {
  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()
  const { boardId } = useParams<RouteParams>()
  const queryClient = useQueryClient()

  const { data: board, isLoading } = useBoardQuery(boardId || '')
  const mutation = useBoardUpdateMutation()
  const ckeditor = useCkeditor(false, board?.content || '');

  const [title, setTitle] = useState(board?.title || '')
  const [content, setContent] = useState(board?.content || '')
  const [boardCategory, setBoardCategory] = useState(board?.content || '')

  const handleChange = (event: SelectChangeEvent) => {
    setBoardCategory(event.target.value);
  }

  const handleEditFinishClick = async () => {
    const { writer } = board || { writer: "" };
    console.log('수정 완료?');


    if (title && content && writer && boardCategory) {
      const updateData = {
        boardId,
        title,
        content: ckeditor?.getData() || '',
        writer,
        boardCategory,
      };

      await mutation.mutateAsync(updateData);
      queryClient.invalidateQueries(['board', boardId]);
      navigate(`/key-we-board-page/read/${boardId}`);
    }
  }
  const handleDeleteClick = async () => {
    const resuit = window.confirm('정말로 삭제 하시겠습니까?')

    if (resuit === true) {
      alert("삭제")
      await deleteBoard(boardId || '')
      queryClient.invalidateQueries('boardList')
      navigate("/key-we-board-page/list")
    } else {
      alert('취소')
    }
  }

  const handleCancelClick = () => {
    navigate(`/key-we-board-page/read/${boardId}`)
  }
  useEffect(() => {
    if (!isLoading && board) {
      setTitle(board.title);
      setContent(board.content);
      setBoardCategory(board.boardCategory);
    }
  }, [isLoading, board])

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: '1rem' }}>
          <TextField disabled name="writer" value={user.nickName} sx={{ borderRadius: '4px' }} />
          <Box sx={{ width: "50%" }} />
          <FormControl variant="standard" sx={{ minWidth: 100 }}>
            <InputLabel id="category">카테고리</InputLabel>
            <Select labelId="category" id="demo-simple-select-standard" value={boardCategory} onChange={handleChange} label="category">
              <MenuItem value="Main">Main</MenuItem>
              <MenuItem value="Spring">Spring</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Vue">Vue</MenuItem>
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="Question">Question</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display='contents'> </Box>
        <Box display="flex" flexDirection="column" >
          <TextField label="제목" name="title" sx={{ borderRadius: '10px' }} value={title} onChange={(e) => setTitle(e.target.value)} />
          <div id='editor' style={{ width: '100%', minHeight: '500px' }} />
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <Button variant='outlined' onClick={handleDeleteClick} color='error' >삭제</Button>
          </Grid>
          <Grid item xs={8}>
            <Box />
          </Grid >
          <Grid item xs={3}>
            <Button variant='outlined' onClick={handleCancelClick}>돌아가기</Button>
            <Button variant='outlined' onClick={handleEditFinishClick}>수정완료</Button>
          </Grid >
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default BoardModifyPage

