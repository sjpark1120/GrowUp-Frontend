import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/common/Header';
import MainPage from './pages/MainPage/MainPage';
import GrowRoomPage from './pages/GrowRoomPage/GrowRoomPage';
import GrowRoomWritePage from './pages/GrowRoomPage/GrowRoomWritePage';
import GrowRoomPostPage from './pages/GrowRoomPage/GrowRoomPostPage';
import LiveUpPage from './pages/LiveUpPage/LiveUpPage';
import LiveUpJoinPage from './pages/LiveUpPage/LiveUpJoinPage';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<MainPage />} />
        <Route path='/growroom' element={<GrowRoomPage />} />
        <Route path="/growroom/write" element={<GrowRoomWritePage />} /> 
        <Route path="/growroom/:postId" element={<GrowRoomPostPage />} /> 
        <Route path='/liveup' element={<LiveUpPage />} />
        <Route path='/liveup/:roomid' element={<LiveUpJoinPage />} />
      </Route>
    </Routes>
  );
}

export default App;
