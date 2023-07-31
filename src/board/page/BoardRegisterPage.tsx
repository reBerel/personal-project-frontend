import React from 'react';
import { Container, Box, Button, TextField, ThemeProvider, createTheme } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { registerBoard } from '../../api/BoardApi';
import { green } from '@mui/material/colors';
import useUserStore from '../../store/UserStore';
import useCkeditor from '../../hook/useCkeditor';

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
            marginTop: '-0.2rem'
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
  const ckeditor = useCkeditor(false,'');
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation(registerBoard, {
    onSuccess: (data) => {
      queryClient.setQueryData('board', data);
      
      navigate(`/key-we-board-page/read/${data.boardId}`)
    }
  })

  const [category, setCategory] = React.useState('All');
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const target = event?.target as typeof event.target & {
      elements: {
        title: { value: string }
        writer: { value: string }
        // content: { value: string }        
      }
    }
    const { title, writer  } = target.elements

    const data = {
      title: title.value,
      writer: writer.value,
      content: ckeditor?.getData()||'',
      category: category,
    }
    if(data.title&&data.content) await mutation.mutateAsync(data)
  }



  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: '1rem' }}>
            <TextField disabled value={user.nickName} name="writer" sx={{ width: '50%', borderRadius: '4px', top: '1rem', marginBottom: '10px', backgroundColor: '#ffffff', color: '#000000',}}/>
            <Box sx={{ width: "50%" }}/>
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
              <InputLabel id="category">카테고리</InputLabel>
              <Select labelId="category" id="demo-simple-select-standard" value={category} onChange={handleChange} label="category">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Spring">Spring</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="Vue">Vue</MenuItem>
                <MenuItem value="React">React</MenuItem>
                <MenuItem value="Question">Question</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display='contents'></Box>
          <Box display="flex" flexDirection="column">
            <TextField label="제목" name="title" sx={{ borderRadius: '10px', backgroundColor: '#ffffff' }} />
            <div id='editor' style={{width:'100%', minHeight:'500px'}}/>
          </Box>
          <Button type="submit">작성 완료</Button>
        </form>
      </Container>
    </ThemeProvider>
  )
}

export default BoardRegisterPage;

