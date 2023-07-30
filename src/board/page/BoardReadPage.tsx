import { Button, Checkbox, Container, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { green } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBoard, incrementReadCount, useBoardQuery } from '../../api/BoardApi';
import useUserStore from '../../store/UserStore';
import CommentPage from '../../comment/page/CommentPage';
import springAxiosInst from '../../utility/axiosInstance';
import CommentListPage from '../../comment/page/CommentListPage';
import BoardListPage from './BoardListPage';
import useCkeditor from '../../hook/useCkeditor';
import { useQueryClient } from 'react-query';

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
  const { data: board } = useBoardQuery(boardId || '');
  const ckeditor = useCkeditor(true,board?.content||'로딩중');
  const queryClient = useQueryClient()
  
  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()

  const bookmarkChecked = (board?.bookmarks.filter((bookmark)=>bookmark.userId===user.userId).length||-1)===1;
  const likeChecked = (board?.likes.filter((like)=>like.userId===user.userId).length||-1)===1;

  const handleBookmark = async () => {
    if (user?.userId) {
      try {
        const response = await springAxiosInst.post(`/user/bookmark/${user.userId}`, { boardId });
        if (response.status === 200) {
          queryClient.invalidateQueries(['board', boardId]);
          queryClient.invalidateQueries('bookmarkList');
        } else {
          console.error('북마크 저장 실패1');
        }
      } catch (error) {
        console.error('북마크 저장 실패2:', error);
      }
    } else {
      alert('로그인 후 이용 가능합니다.');
    }
  };

  const handleModifyClick = () => {
    if (user.uid) {
      navigate(`/key-we-board-page/modify/${boardId}`)
    } else
      alert("수정권한이 없는 게시물입니다.")
  }
  useEffect(() => {
    const fetchBoardData = async () => {
      await fetchBoard(boardId || '');
    };
    fetchBoardData();
  }, [boardId]);

  useEffect(() => {
    if (boardId)  incrementReadCount(boardId);
  }, [boardId])

  const handleLikeCount = async () => {
    if (!user.userId) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    if (!likeChecked) {
      try {
        const likeCountRequestDto = { userId: user.userId };
        await springAxiosInst.post(`/board/like-count/${boardId}`, likeCountRequestDto);
        queryClient.invalidateQueries(['board', boardId]);
      } catch (error) {
        console.error("추천실패:", error);
        alert("추천에 실패하였습니다.");
      }
    } else {
      alert("이미 추천한 게시물입니다.");
    }
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await springAxiosInst.get(`/board/like-count/${boardId}`);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchLikeStatus();
  }, [boardId]);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <TableContainer component={Paper}>
          <Table aria-label='board table'>
            <TableHead>
              <TableRow key={board?.boardId}>
                <TableCell colSpan={1} align='left'>No. {boardId} </TableCell>
                <TableCell colSpan={4} align='left'>[{board?.boardCategory ? board.boardCategory : '-'}] 제목:{board?.title} [{board?.replyCount ? board.replyCount : 0}] </TableCell>
                <TableCell>
                  <Checkbox checked={bookmarkChecked} onChange={() => handleBookmark()} sx={{ color: green['500'] }} icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='left' sx={{ width: '2Z%' }}>작성자:{board?.writer} </TableCell>
                <TableCell sx={{ width: '5%' }}></TableCell>
                <TableCell sx={{ width: '25%' }}></TableCell>
                <TableCell align='center' sx={{ width: '28%' }}>작성일 {board?.createDate} </TableCell>
                <TableCell align='left' sx={{ width: '10%' }}>추천 {board?.likes.length||0} </TableCell>
                <TableCell align='left' sx={{ width: '8%' }}>
                  <RemoveRedEyeIcon fontSize='small' />
                  {board?.readCount}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <div id='editor' style={{width:'100%', minHeight:'500px'}}/>
        {
          user.uid ?
            (<Button variant='outlined' onClick={handleModifyClick}>수정</Button>)
            : (
              <span></span>
            )
        }
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
            <Checkbox checked={likeChecked} icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right', color: green['500'] }} onChange={handleLikeCount} />
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left' }}>
            <Checkbox checked={bookmarkChecked} onChange={() => handleBookmark()} icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', color: green['500'] }} />
          </Grid>
        </Grid>
        <TableCell colSpan={5} sx={{ backgroundColor: 'white', fontSize: '15px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>댓글</TableCell>
      </Container>
      <CommentListPage  comments={board?.comments||[]}/>
      <CommentPage/>
      <BoardListPage />
    </ThemeProvider>
  )
}

export default BoardReadPage;