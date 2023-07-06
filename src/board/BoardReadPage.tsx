import { Box, Button, Container, TextField } from '@mui/material'
import React from 'react'

const BoardReadPage = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
    <TextField label="작성자" name="writer" sx={{ borderRadius: '4px' }}/>
    {/* <TextField select label="카테고리" name='boardCategory' variant="outlined" >
          <MenuItem>Small</MenuItem>
          <MenuItem>Medium</MenuItem>
          <MenuItem>Large</MenuItem>
        </TextField>   */}
      <Box display='contents'>
        </Box>
        <Box display="flex" flexDirection="column" >
        <TextField label="제목" name="title" sx={{ borderRadius: '10px' }}/>            

        <TextField label="내용" name="content" multiline 
                  minRows={20} maxRows={20} sx={{ borderRadius: '4px' }}/>
      </Box>
      <Button type="submit">작성 완료</Button>
  </Container>

  )
}

export default BoardReadPage