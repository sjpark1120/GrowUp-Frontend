
import LoginPage from './pages/LoginPage';
import SignUpPage from "./pages/JoinPage/SignUpPage";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import MainPage from "./pages/MainPage/MainPage";
import GrowRoomPage from "./pages/GrowRoomPage/GrowRoomPage";
import GrowRoomWritePage from "./pages/GrowRoomPage/GrowRoomWritePage";
import GrowRoomPostPage from "./pages/GrowRoomPage/GrowRoomPostPage";
import LiveUpPage from "./pages/LiveUpPage/LiveUpPage";
import LiveUpJoinPage from "./pages/LiveUpPage/LiveUpJoinPage";
import FindPasswordPage from "./pages/JoinPage/FindPasswordPage";
import ChangePasswordPage from "./pages/JoinPage/ChangePasswordPage";

import MyPage from "./pages/MyPage/MyPage";
import EditProfile from './pages/MyPage/EditProfile';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route index element={<MainPage />} />
        <Route path="/growroom" element={<GrowRoomPage />} />
        <Route path="/growroom/write" element={<GrowRoomWritePage />} />
        <Route path="/growroom/:postId" element={<GrowRoomPostPage />} />
        <Route path="/liveup" element={<LiveUpPage />} />
        <Route path="/liveup/:roomid" element={<LiveUpJoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage/edit" element={<EditProfile/>} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/findpassword" element={<FindPasswordPage />} />
        <Route path="/changepassword" element={<ChangePasswordPage />} /> 
      </Route>
    </Routes>
  );
}

export default App;
