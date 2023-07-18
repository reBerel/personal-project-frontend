import { Box, Button, Container, TextField, ThemeProvider, createTheme } from '@mui/material'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { registerBoard } from '../../api/BoardApi'
import BoardRegisterCategoryComponent from '../component/BoardRegisterCategoryComponent'
import { green } from '@mui/material/colors'
import useUserStore from '../../store/UserStore'

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: ' 15px'
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


const BoardRegisterPage = () => {
  const user = useUserStore((state)=> state.user) 
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [category, setCategory] = useState('');
  const mutation = useMutation(registerBoard, {
    onSuccess: (data) => {
      queryClient.setQueryData('board', data)
      navigate(`/key-we-board-page/read/${data.boardId}`)
    }
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const target = event?.target as typeof event.target & {
      elements: {
        title: { value: string }
        writer: { value: string }
        content: { value: string }        
      }
    }
    const { title, writer, content } = target.elements

    const data = {
      title: title.value,
      writer: writer.value,
      content: content.value,
      category: Number(category)
    }
    await mutation.mutateAsync(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <form onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: '1rem' }}>
          <TextField value={user.nickName} name="writer" sx={{ width: '50%', borderRadius: '4px', top: '1rem', marginBottom: '10px'}}/>
          <Box sx={{ width: "50%" }}/>
          <BoardRegisterCategoryComponent category={category} onChange={setCategory}/>
          </Box>
          {/* writer -> User.nickName */}
          <Box display='contents'>
        </Box>
          <Box display="flex" flexDirection="column" >
            <TextField label="제목" name="title" sx={{ borderRadius: '10px' }} />
            <TextField label="내용" name="content" multiline
              minRows={20} maxRows={20} sx={{ borderRadius: '4px', marginTop: '10px' }} />
          </Box>
          <Button type="submit">작성 완료</Button>
        </form>
      </Container>
    </ThemeProvider>
  )
}

export default BoardRegisterPage