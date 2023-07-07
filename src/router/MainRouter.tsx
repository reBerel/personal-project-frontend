import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import BoardListPage from '../board/BoardListPage'
import BoardRegisterPage from '../board/BoardRegisterPage'
import BoardReadPage from '../board/BoardReadPage'
import SignIn from '../sign/SignIn'
import SignUp from '../sign/SignUp'
import BoardModifyPage from '../board/BoardModifyPage'

const MainRouter = () => {
  return (
    <div>
        <Suspense fallback={<div>로딩중.......</div>}>
            <Routes>
                <Route path='/' element={<Navigate to="/key-we-board-page/list" replace/>}/>
                 <Route path='key-we-board-page/list' element={<BoardListPage/>} />
                 <Route path='key-we-board-page/register' element={<BoardRegisterPage/>} />
                 <Route path='key-we-board-page/read/:boardId' element={<BoardReadPage/>} />
                 <Route path='key-we-board-page/modify/:boardId' element={<BoardModifyPage/>} />
                 <Route path='key-we-board-page/sign-in' element={<SignIn/>} />
                 <Route path='key-we-board-page/sign-up' element={<SignUp/>} />
            </Routes>
        </Suspense>
    </div>
  )
}

export default MainRouter