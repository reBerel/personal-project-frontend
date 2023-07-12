import { Box, Button, Container, Grid } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BoardPageComponent from '../component/BoardPageComponent'
import BoardSearchComponent from '../component/BoardSearchComponent'


const BoardListGridComponent = () => {
  const navigate = useNavigate()

  const handleRegisterClick = () => {
  navigate('/key-we-board-page/register');
};
  return (
    <Container>
          <Grid container spacing={2}>
            <Grid item xs={3}>
            <Button onClick={handleRegisterClick} style={{ marginTop: '4px' }} >글 작성</Button>            
          </Grid>
            <Grid item xs={4}>
            <Box/>            
            </Grid>
            <Grid item xs={5}>
            <BoardSearchComponent/>
            </Grid>                        
            <Grid item xs={2}>
            <Box/>            
            </Grid>
            <Grid item xs={8}>
            <BoardPageComponent/>
            </Grid>
            <Grid item xs={2}>
            <Box/>            
            </Grid>
            </Grid>
    </Container>
  )
}

export default BoardListGridComponent