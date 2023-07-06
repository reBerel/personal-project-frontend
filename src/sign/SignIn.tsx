import { Box, Button, Container, Grid, Link, TextField } from '@mui/material'
import React from 'react'

const SignIn = () => {
  return (
    <Container maxWidth="xs"  style={{ marginTop: "30px" }}>
    <Box display="flex" flexDirection="column">
       <TextField label="아이디" sx={{p:0.8}}></TextField>
       <TextField label="비밀번호" sx={{p:0.8}}></TextField>    
       <Button style={{marginTop: "20px"}} variant="contained" color="primary">SIGN IN</Button>
       </Box>
       <Grid container>
            <Grid item xs>
       {/* <Link href="/key-we-board-page/sign-up" underline="none" fontSize="13px">아이디 찾기</Link> */}
       </Grid>
       <Grid item>
        <Box marginTop="10px">
       <Link href="/key-we-board-page/sign-up" underline="none" fontSize="15px">회원가입하기</Link>
       </Box>
       </Grid>
       </Grid>
       {/* oauth 자리 */}
    </Container>
  )
}

export default SignIn