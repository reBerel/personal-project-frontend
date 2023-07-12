import { CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect } from 'react'
import useBoardStore from '../../store/BoardStore'
import { fetchBoardList, useBoardQueryList } from '../../api/BoardApi'
import { useNavigate } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BoardCategoryComponent from '../component/BoardCategoryComponent'
import BoardListGridComponent from '../component/BoardListGridComponent'
import { green } from '@mui/material/colors'

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
      primary:{
        main: green['500'],
      },
    },
  });

const BoardListPage = () => {
    const { data: boards, isLoading, isError } = useBoardQueryList()
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
        <BoardCategoryComponent/>
            <TableContainer component={Paper}>
                <Table aria-label='board table'>
                    <TableHead>
                        <TableRow>                            
                            <TableCell align='center' style={{width: '7%'}}>No.</TableCell>
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
                                <TableCell align='center' sx={{fontSize: '14px'}}>{board.boardId}</TableCell>
                                <TableCell align='center' sx={{fontSize: '14px'}}>{board.title} [{board.replyCount ? board.replyCount : 0}]</TableCell>                                
                                <TableCell align='center' sx={{fontSize: '14px'}}>{board.writer}</TableCell>
                                <TableCell align='center' sx={{fontSize: '12px'}}>{board.createDate}</TableCell>
                                <TableCell align='center' sx={{fontSize: '14px'}}>{board.likeCount ? board.likeCount : 0}</TableCell>
                                <TableCell align='center' sx={{fontSize: '14px'}}>{board.readCount ? board.readCount : 0}</TableCell>
                            </TableRow>
                            )))}                            
                    </TableBody>
                </Table>
            </TableContainer>
            <BoardListGridComponent/>          
        </Container>
        </ThemeProvider>
    )
}

export default BoardListPage