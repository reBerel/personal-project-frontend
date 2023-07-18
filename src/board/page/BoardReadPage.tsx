import { Button, Checkbox, Container, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BoardListPageSub from './BoardListPageSub';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { green } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBoard, useBoardQuery } from '../../api/BoardApi';
import useUserStore from '../../store/UserStore';

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: ' 10px'
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

const BoardReadPage = () => {
  const { boardId } = useParams()
  const { data: board } = useBoardQuery(boardId || '')
  const [isBookmarkChecked, setBookmarkChecked] = useState(false);
  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()
  const handleBookmark = () => {
    if (user.uid) {
      setBookmarkChecked((prev: any) => !prev);      
    }else{
      alert("로그인 후 이용가능합니다.")
    }    
  }
  const handleModifyClick = ()=> {
    if (user.uid) {
      navigate(`/key-we-board-page/modify/${boardId}`)
    }else
    alert("수정권한이 없는 게시물입니다.")
  }

  useEffect(() => {
    const fetchBoardData = async () => {
      const data = await fetchBoard(boardId || '');
      console.log(data);
    };
    fetchBoardData();
  }, [boardId]
  )
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <TableContainer component={Paper}>
          <Table aria-label='board table'>
            <TableHead>
              <TableRow key={board?.boardId}>
                <TableCell align='left'>No. {boardId} </TableCell>
                <TableCell colSpan={3} align='left'>제목:{board?.title} [{board?.replyCount ? board.replyCount : 0}] </TableCell>
                <TableCell>
                  <Checkbox checked={isBookmarkChecked} onChange={() => handleBookmark()} sx={{ color: green['500'] }} icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left' style={{ width: '14%' }}>작성자:{board?.writer} </TableCell>
                <TableCell style={{ width: '43%' }}></TableCell>
                <TableCell align='center'>작성일 {board?.createDate} </TableCell>
                <TableCell align='left' style={{ width: '10%' }}>추천 {board?.likeCount ? board.likeCount : 0} </TableCell>
                <TableCell align='left' style={{ width: '8%' }}>
                  <RemoveRedEyeIcon fontSize='small' />
                  {board?.readCount ? board.readCount : 0}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <TextField disabled name="content" multiline value={board?.content}
          minRows={20} maxRows={30} sx={{ borderRadius: '4px', width: '850px', marginTop: '10px', marginBottom: '5px' }} />
          {
            user.uid?
            (<Button variant='outlined' onClick={handleModifyClick}>수정</Button>)
            :(
              <span></span>
            )
          }
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right', color: green['500'] }} />
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left' }}>
            <Checkbox checked={isBookmarkChecked} onChange={() => handleBookmark()} icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', color: green['500'] }} />
          </Grid>
        </Grid>
      </Container>
      <BoardListPageSub />
    </ThemeProvider>
  )
}

export default BoardReadPage

