import { Box, Button,  Container,  Grid,  TextField, ThemeProvider, createTheme, styled } from '@mui/material'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { registerBoard } from '../../api/BoardApi'
import BoardRegisterCategoryComponent from '../component/BoardRegisterCategoryComponent'
import { green } from '@mui/material/colors'

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


const BoardRegisterPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation(registerBoard, {
    onSuccess: (data) => {
      queryClient.setQueryData('board',data)
      navigate(`/key-we-board-page/read/${data.boardId}`)
    }
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
      const target = event?.target as typeof event.target & {
        elements: {
          title: {value: string }
          writer: {value: string }
          content: {value: string }
        }
      }    
    const {title, writer, content} = target.elements

    const data = {
      title: title.value,
      writer: writer.value,
      content: content.value
    }
    await mutation.mutateAsync(data)
  }



  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="md" sx={{ marginTop: '2rem'  }}>
    <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
          <Grid item xs={4}>
    <TextField label="작성자" name="writer" sx={{ borderRadius: '4px'}}/>
    </Grid>
    <Grid item xs={2}>
    <BoardRegisterCategoryComponent/>
    </Grid>
    </Grid>
    {/* writer -> User.nickName */}
      <Box display='contents'>
        </Box>
        <Box display="flex" flexDirection="column" >
        <TextField label="제목" name="title" sx={{ borderRadius: '10px' }}/>            

        <TextField label="내용" name="content" multiline 
                  minRows={20} maxRows={20} sx={{ borderRadius: '4px',marginTop: '10px' }}/>
      </Box>
      <Button type="submit">작성 완료</Button>
    </form>  
  </Container>
  </ThemeProvider>
  )
}

export default BoardRegisterPage