import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import BoardListPage from '../board/page/BoardListPage'
import BoardRegisterPage from '../board/page/BoardRegisterPage'
import BoardReadPage from '../board/page/BoardReadPage'
import SignIn from '../user/sign/SignIn'
import SignUp from '../user/sign/SignUp'
import BoardModifyPage from '../board/page/BoardModifyPage'
import UserProfile from '../user/page/UserProfile'
import UserInformation from '../user/page/UserInformation'
import UserWriting from '../user/page/UserWriting'
import UserBookmark from '../user/page/UserBookmark'
import useUserStore from '../store/UserStore'
import UserDelete from '../user/page/UserDelete'
const MainRouter = () => {
  const user = useUserStore((state) => state.user)
  return (
    <div>
      <Suspense fallback={<div>로딩중.......</div>}>
        <Routes>
          <Route path='/' element={<Navigate to="/key-we-board-page/list" replace />} />
          <Route path='key-we-board-page/list' element={<BoardListPage />} />
          <Route path='key-we-board-page/register' element={<BoardRegisterPage />} />
          <Route path='key-we-board-page/read/:boardId' element={<BoardReadPage />} />
          <Route path='key-we-board-page/modify/:boardId' element={<BoardModifyPage />} />
          <Route path='key-we-board-page/sign-in' element={<SignIn />} />
          <Route path='key-we-board-page/sign-up' element={<SignUp />} />
          <Route path={`/key-we-board-page/profile/${user.uid}`} element={<UserProfile />} />
          <Route path={`/key-we-board-page/info/${user.uid}`} element={<UserInformation />} />
          <Route path={`/key-we-board-page/writing/${user.uid}`} element={<UserWriting />} />
          <Route path={`/key-we-board-page/bookmark/${user.uid}`} element={<UserBookmark />} />
          <Route path={`/key-we-board-page/profile/delete/${user.uid}`} element={<UserDelete />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default MainRouter