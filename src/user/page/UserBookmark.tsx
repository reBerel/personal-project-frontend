import { AlertTitle, CircularProgress, Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, createTheme } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { green } from '@mui/material/colors';
import useUserStore from '../../store/UserStore';
import useBoardStore from '../../store/BoardStore';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBoardListPage, useBookmarkQueryList } from '../../api/BoardApi';
import BookIcon from '@mui/icons-material/Book';
import { Board, BoardResponse } from '../../board/entity/Board'

const pageNumber = 10;
const pageSize = 10;

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

const UserBookmark = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const user = useUserStore((state) => state.user);
  const { data: boards, isLoading, isError } = useBookmarkQueryList(user.userId);
  const setBoards = useBoardStore((state) => state.setBoards);
  const navigate = useNavigate();

  const fetchBoardsByPage = async (pageNumber: number) => {
    try {
      const data: BoardResponse = await fetchBoardListPage(pageNumber, pageSize);
      setBoards(data.boards);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('게시물 목록을 불러오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    // 페이지가 변경될 때마다 데이터를 가져오도록 호출
    fetchBoardsByPage(page);
  }, [page]);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 데이터를 가져오도록 호출
    const fetchData = async () => {
      const data = await fetchBoardListPage(pageNumber, pageSize);
      setBoards(data.boards);
      setTotalPages(data.totalPages);
    };
    fetchData();
  }, [setBoards]);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <Typography>리스트를 갖고오는 중 에러 발생!</Typography>;
  }

  const ReadClick = (boardId: number) => {
    navigate(`/key-we-board-page/read/${boardId}`)
  };

  return (    
    <ThemeProvider theme={theme}>
    <Container maxWidth="md" style={{ marginTop: '3rem' }}>
      <Typography component="h1" variant="h5" sx={{ color: '#6BB07B' }}>
        {' '}
        <BookIcon /> MyBookMark
      </Typography>
      {/* 선택된 게시물 정보 출력 */}
      <TableContainer component={Paper}>
        <Table aria-label="board table">
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
            {boards?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  현재 등록된 게시물이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              boards?.map((board) => (
                <TableRow key={board.boardId} onClick={() => ReadClick(board.boardId)} style={{ cursor: 'pointer' }}>
                  <TableCell align='center' sx={{ fontSize: '13px' }}>{board.boardId}</TableCell>
                  <TableCell align='center' sx={{ fontSize: '13px' }}>{board.boardCategory}</TableCell>
                  <TableCell align='center' sx={{ fontSize: '13px' }}>{board.title} [{board.comments.length}]</TableCell>
                  <TableCell align='center' sx={{ fontSize: '13px' }}>{board.writer}</TableCell>
                  <TableCell align='center' sx={{ fontSize: '13px' }}>{board.createDate}</TableCell>
                  <TableCell align='center' sx={{ fontSize: '13px' }}>{board.likes.length}</TableCell>
                  <TableCell align='center' sx={{ fontSize: '13px' }}>{board.readCount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
        <Pagination page={page} count={totalPages} siblingCount={2} boundaryCount={1} shape="rounded" onChange={handlePageChange} showFirstButton showLastButton sx={{ marginTop: '0.5rem' }}/>
      </Container>
    </ThemeProvider>
  )
}

export default UserBookmark;
