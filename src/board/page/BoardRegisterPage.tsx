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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';


const editorConfig = {
  ...ClassicEditor.defaultConfig,
  toolbar: {
    items: [
      'codeBlock',
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'undo',
      'redo',
      '|',
      'imageUpload',
      'alignment:left',
      'alignment:right',
      'alignment:center',
      'alignment:justify',
      'fontColor',
      'fontBackgroundColor',
      'code',

    ],
  },
  language: 'ko',
  codeBlock: {
    languages: [
      { language: 'plaintext', label: 'Plain Text' },
      { language: 'html', label: 'HTML' },
      { language: 'java', label: 'Java' },
      { language: 'javascript', label: 'JavaScript' },
      { language: 'python', label: 'Python' },
      { language: 'typescript', label: 'TypeScript' },
      { language: 'xml', label: 'XML' }
    ],
  },
};

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
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation(registerBoard, {
    onSuccess: (data) => {
      queryClient.setQueryData('board', data)
      navigate(`/key-we-board-page/read/${data.boardId}`)
    }
  })

  const [category, setCategory] = React.useState('');
  const [content, setContent] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  }
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setContent(data); // 에디터의 내용을 상태로 업데이트
  };

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
      content: content,
      category: category,
    }
    await mutation.mutateAsync(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: '1rem' }}>
            <TextField disabled value={user.nickName} name="writer" sx={{ width: '50%', borderRadius: '4px', top: '1rem', marginBottom: '10px'}}/>
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
            <TextField label="제목" name="title" sx={{ borderRadius: '10px' }} />
            {/* <TextField label="내용" name="content" multiline minRows={20} maxRows={20} sx={{ borderRadius: '10px', marginTop: '10px' }} /> */}
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig} // 수정된 설정 사용
              data={content}
              onReady={(editor) => {
                console.log('Editor is ready to use!', editor);
              }}
              onChange={handleEditorChange}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          </Box>
          <Button type="submit">작성 완료</Button>
        </form>
      </Container>
    </ThemeProvider>
  )
}

export default BoardRegisterPage;

