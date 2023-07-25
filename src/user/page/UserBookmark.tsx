import { AlertTitle, CircularProgress, Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, createTheme } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { green } from '@mui/material/colors';
import useUserStore from '../../store/UserStore';
import useBoardStore from '../../store/BoardStore';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBoardListPage, useBoardQueryList } from '../../api/BoardApi';
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

  const { data: boards, isLoading, isError } = useBoardQueryList();
  const { boardId } = useParams(); 
  const users = useUserStore((state) => state.users);
  const setBoards = useBoardStore((state) => state.setBoards);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
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
      {selectedBoard && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          선택된 게시물: {selectedBoard?.title}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="board table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: '7%' }}>
                No.
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
              <TableCell align="center" style={{ width: '7%' }}>
                추천
              </TableCell>
              <TableCell align="center" style={{ width: '3%' }}>
                <RemoveRedEyeIcon fontSize="small" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  현재 등록된 게시물이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              users?.map((user) => (
                <TableRow
                  key={user.userId}
                  onClick={() => ReadClick(user.userId)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell align="center" sx={{ fontSize: '14px' }}>
                    {user.userId}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '14px' }}>
                    {user.board.title} [{user.board.replyCount ? user.board.replyCount : 0}]
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '14px' }}>
                    {user.board.writer}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '12px' }}>
                    {user.board.createDate}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '14px' }}>
                    {user.board.likeCount ? user.board.likeCount : 0}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '14px' }}>
                    {user.board.readCount ? user.board.readCount : 0}
                  </TableCell>
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
