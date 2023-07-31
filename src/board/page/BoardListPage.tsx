import { BottomNavigation, BottomNavigationAction, Box, Button, CircularProgress, Container, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useBoardStore from '../../store/BoardStore'
import { fetchBoardList, fetchBoardListPage, useBoardQueryList } from '../../api/BoardApi'
import { useNavigate } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { green } from '@mui/material/colors'
import BoardSearchComponent from '../component/BoardSearchComponent'
import useUserStore from '../../store/UserStore'

let filteredBoards;

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

const BoardListPage = () => {
  const pageSize = 10;
  // 페이지와 총 페이지 수 상태 관리
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  // 카테고리 선택 상태 관리
  const selectedCategory = useBoardStore((state) => state.selectedCategory) || "All";
  const filterOptions = ['All', 'Spring', 'Python', 'Vue', 'React', 'Question'];
  // 페이지 변경 처리 함수
  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };
  // 게시물 목록 데이터와 로딩, 에러 상태 관리
  const { data: boards, isLoading, isError } = useBoardQueryList();

  // 전역 상태에 있는 게시물 목록 설정 함수 가져오기
  const setBoards = useBoardStore((state) => state.setBoards);

  // 유저 정보와 페이지 네이게이션 훅 가져오기
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  // 컴포넌트가 처음 렌더링될 때 게시물 목록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBoardList();
      setBoards(data);
    };
    fetchData();
  }, [setBoards]);

  // 페이지 별로 게시물 목록 가져오는 함수
  const fetchBoardsByPage = async (pageNumber: number) => {
    try {
      const data = await fetchBoardListPage(pageNumber, pageSize);
      setBoards(data.boards);
      setTotalPages(data.totalPages);
      console.log('setBoards(), setTotalPages():', data.boards, data.totalPages);
      console.log('setBoards():', data.boards)
    } catch (error) {
      console.error('게시물 목록을 불러오는데 실패했습니다:', error);
    }
  };

  // 페이지가 변경될 때마다 게시물 목록 가져오기
  useEffect(() => {
    fetchBoardsByPage(page);
  }, [page]);

  // 게시물 읽기 클릭 시 페이지 이동 처리 함수
  const ReadClick = (boardId: number) => {
    navigate(`/key-we-board-page/read/${boardId}`);
    window.scrollTo(0, 0);
  };

  // 글 작성 버튼 클릭 시 페이지 이동 처리 함수
  const handleRegisterClick = () => {
    if (user.uid) {
      navigate('/key-we-board-page/register');
    } else {
      alert('로그인 후 이용해 주시길 바랍니다');
    }
  };

  // 로딩 중인 경우 로딩 스피너 반환
  if (isLoading) {
    return <CircularProgress />;
  }

  // 에러 발생 시 에러 메시지 반환
  if (isError) {
    return <Typography>리스트를 갖고오는 중 에러 발생!</Typography>;
  }

  // 카테고리 변경 처리 함수
  const handleChangeCategory = (event: React.ChangeEvent<{}>, newValue: string) => {
    console.log("선택한 카테고리:", newValue);
    useBoardStore.setState({ selectedCategory: newValue });
  };

  // 카테고리에 따른 게시물 필터링 처리
  if (selectedCategory === 'All') {
    filteredBoards = boards;
  } else {
    filteredBoards = boards?.filter((board) => board.boardCategory === selectedCategory);
  }

  // console.log('selectedCategory:', selectedCategory);
  // console.log('전체 게시물 목록:', boards);
  // console.log('필터링된 게시물 목록:', filteredBoards);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" style={{ marginTop: '3rem' }}>
        {/* BoardCategoryComponent를 BoardListPage로 이동 */}
        <Box>
          <BottomNavigation
            showLabels
            value={selectedCategory}
            onChange={(event, newValue) => handleChangeCategory(event, newValue)}
            sx={{ height: '2.5rem', marginBottom: '5px' }}
            component={Paper}
          >
            {filterOptions.map(option => (
              <BottomNavigationAction
                key={option}
                value={option}
                label={option}
              />
            ))}
          </BottomNavigation>
        </Box>
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
              {boards?.length && filteredBoards?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    현재 등록된 게시물이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                filteredBoards?.map((board) => (
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
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button onClick={handleRegisterClick} style={{ marginTop: '4px' }} >글 작성</Button>
          </Grid>
          <Grid item xs={4}>
            <Box />
          </Grid>
          {/* <Grid item xs={5}>
            <BoardSearchComponent />
          </Grid> */}
          <Grid item xs={2}>
            <Box />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
            <Pagination page={page} count={1} siblingCount={2} boundaryCount={2} shape="rounded" onChange={handlePageChange} showFirstButton showLastButton />
          </Grid>
          <Grid item xs={2}>
            <Box />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default BoardListPage;
