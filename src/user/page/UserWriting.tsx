import { CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, createTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { green } from '@mui/material/colors';
import BoardPageComponent from '../../board/component/BoardPageComponent'
import useUserStore from '../../store/UserStore';
import useBoardStore from '../../store/BoardStore';
import { useNavigate } from 'react-router-dom';
import { fetchBoardList, useBoardQueryList } from '../../api/BoardApi';
import EditIcon from '@mui/icons-material/Edit';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            padding: '5px 12px', // 입력 필드의 내부 여백 설정
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

const UserWriting = () => {
  const { data: boards, isLoading, isError } = useBoardQueryList()
  const user = useUserStore((state) => state.user)
  const setBoards = useBoardStore((state) => state.setBoards)
  const navigate = useNavigate()
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
  const currentUserBoards = boards?.filter((board) => board.writer === user?.nickName);

  const ReadClick = (boardId: number) => {
    navigate(`/key-we-board-page/read/${boardId}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" style={{ marginTop: '3rem' }}>
      <Typography component="h1" variant="h5" sx={{color: '#6BB07B'}}> <EditIcon/>MY Info</Typography>
        <TableContainer component={Paper}>
          <Table aria-label='board table'>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: '7%' }}>
                  No.
                </TableCell>
                <TableCell align="center" style={{ width: '8%' }}>
                  분류
                </TableCell>
                <TableCell align="center" style={{ width: '45%' }}>
                  제목
                </TableCell>
                <TableCell align="center" style={{ width: '10%' }}>
                  작성자
                </TableCell>
                <TableCell align="center" style={{ width: '20%' }}>
                  작성일
                </TableCell>
                <TableCell align="center" style={{ width: '10%' }}>
                  추천
                </TableCell>
                <TableCell align="center" style={{ width: '3%' }}>
                  <RemoveRedEyeIcon fontSize="small" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUserBoards?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>현재 등록된 게시물이 없습니다.</TableCell>
                </TableRow>
              ) : (
                currentUserBoards?.map((board) => (
                  <TableRow key={board.boardId} onClick={() => ReadClick(board.boardId)} style={{ cursor: 'pointer' }}>
                    <TableCell align='center' sx={{ fontSize: '13px' }}>{board.boardId}</TableCell>
                    <TableCell align='center' sx={{ fontSize: '13px' }}>{board.boardCategory}</TableCell>
                    <TableCell align='center' sx={{ fontSize: '13px' }}>{board.title} [{board.comments.length}]</TableCell>
                    <TableCell align='center' sx={{ fontSize: '13px' }}>{board.writer}</TableCell>
                    <TableCell align='center' sx={{ fontSize: '13px' }}>{board.createDate}</TableCell>
                    <TableCell align='center' sx={{ fontSize: '13px' }}>{board.likes.length}</TableCell>
                    <TableCell align='center' sx={{ fontSize: '13px' }}>{board.readCount}</TableCell>
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

export default UserWriting