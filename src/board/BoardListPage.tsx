import { Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, createTheme, makeStyles } from '@mui/material'
import React, { useEffect } from 'react'
import useBoardStore from '../store/BoardStore'
import { fetchBoardList, useBoardQuery } from '../api/BoardApi'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

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
    },
  });

const BoardListPage = () => {
    const { data: boards, isLoading, isError } = useBoardQuery()
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
        return<CircularProgress/>        
    }
    if (isError) {
        return <Typography>리스트를 갖고오는 중 에러 발생!</Typography>
    }
    const ReadClick = (boardId: number) => {
        navigate(`/key-we-board-page/read/${boardId}`)
    }

    return (
        <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{marginTop: '3rem'}}>
            <TableContainer component={Paper}>
                <Table aria-label='board table'>
                    <TableHead>
                        <TableRow >
                            <TableCell align='center' style={{width: '7%'}}>번호</TableCell>
                            <TableCell align='center' style={{width: '50%'}}>제목</TableCell>
                            <TableCell align='center' style={{width: '10%'}}>작성자</TableCell>
                            <TableCell align='center' style={{width: '15%'}}>작성일</TableCell>
                            <TableCell align='center' style={{width: '7%'}}>추천</TableCell>
                            <TableCell align='center' style={{width: '3%'}}>
                                <RemoveRedEyeIcon fontSize='small'/>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { boards?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align='center'>현재 등록된 게시물이 없습니다.</TableCell>
                        </TableRow>
                        ) : (
                            boards?.map((board) => (
                            <TableRow key={board.boardId} onClick={() => ReadClick(board.boardId)} style={{cursor:'pointer'}}>                        
                                <TableCell align='center'>{board.boardId}</TableCell>
                                <TableCell align='center'>{board.title} {board.replyCount} </TableCell>
                                <TableCell align='center'>{board.writer}</TableCell>
                                <TableCell align='center'>{board.creatData}</TableCell>
                                <TableCell align='center'>{board.likeCount ? board.likeCount : '-'}</TableCell>
                                <TableCell align='center'>{board.readCount ? board.readCount : '-'}</TableCell>
                            </TableRow>
                            )))}                            
                    </TableBody>
                </Table>
            </TableContainer>
            <Button component={Link} to="/key-we-board-page/register" color='error' style={{ marginTop: '3px'}}>글 작성</Button>
        </Container>
        </ThemeProvider>
    )
}

export default BoardListPage