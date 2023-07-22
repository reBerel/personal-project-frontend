import { AlertTitle, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, createTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { green } from '@mui/material/colors';
import BoardPageComponent from '../../board/component/BoardPageComponent'
import useUserStore from '../../store/UserStore';
import useBoardStore from '../../store/BoardStore';
import { useNavigate } from 'react-router-dom';
import { fetchBoardList, useBoardQueryList } from '../../api/BoardApi';
import BookIcon from '@mui/icons-material/Book';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            padding: '5px 12px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '10px 15px'
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

const UserBookmark = () => {
  const { data: boards, isLoading, isError } = useBoardQueryList()
  const users = useUserStore((state) => state.users)
  const setBoards = useBoardStore((state)=> state.setBoards)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBoardList()
      setBoards(data)
    }
    fetchData()
  }, [setBoards])
  if (isLoading) {
    return <CircularProgress />
  }
  if (isError) {
    return <Typography>리스트를 갖고오는 중 에러 발생!</Typography>
  }

  const ReadClick = (boardId: number) => {
    navigate(`/key-we-board-page/read/${boardId}`)
  }

  return (    
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ marginTop: '3rem' }}>          
        <Typography component="h1" variant="h5" sx={{color: '#6BB07B'}}> <BookIcon/> MyBookMark</Typography>
          <TableContainer component={Paper}>
            <Table aria-label='board table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center' style={{ width: '7%' }}>No.</TableCell>
                  <TableCell align='center' style={{ width: '45%' }}>제목</TableCell>
                  <TableCell align='center' style={{ width: '10%' }}>작성자</TableCell>
                  <TableCell align='center' style={{ width: '20%' }}>작성일</TableCell>
                  <TableCell align='center' style={{ width: '7%' }}>추천</TableCell>
                  <TableCell align='center' style={{ width: '3%' }}>
                    <RemoveRedEyeIcon fontSize='small' />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align='center'>현재 등록된 게시물이 없습니다.</TableCell>
                  </TableRow>
                ) : (
                  users?.map((user) => (
                    <TableRow key={user.userId} onClick={() => ReadClick(user.userId)} style={{ cursor: 'pointer' }}>
                      <TableCell align='center' sx={{ fontSize: '14px' }}>{user.userId}</TableCell>
                      <TableCell align='center' sx={{ fontSize: '14px' }}>{user.board.title} [{user.board.replyCount ? user.board.replyCount : 0}]</TableCell>
                      <TableCell align='center' sx={{ fontSize: '14px' }}>{user.board.writer}</TableCell>
                      <TableCell align='center' sx={{ fontSize: '12px' }}>{user.board.createDate}</TableCell>
                      <TableCell align='center' sx={{ fontSize: '14px' }}>{user.board.likeCount ? user.board.likeCount : 0}</TableCell>
                      <TableCell align='center' sx={{ fontSize: '14px' }}>{user.board.readCount ? user.board.readCount : 0}</TableCell>
                    </TableRow>
                  )))}
              </TableBody>
            </Table>
          </TableContainer>
          <BoardPageComponent/>
        </Container>
      </ThemeProvider>
  )
}

export default UserBookmark