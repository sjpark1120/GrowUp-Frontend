import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from './growupLogo.jpeg';
import liveuplogo from './liveupLogo.jpeg';
import LoginBox from './LoginBox';
import { useDispatch, useSelector } from 'react-redux';
import AuthApi from '../../apis/Auth';
import { logout } from '../../redux/user';
import { openLoginModal } from '../../redux/loginModal';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 122px;
  max-width: 1920px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${(props) => (props.liveup ? '#141414' : 'white')};
  z-index:49;
  justify-content: center;
  box-shadow: 0px 0px 19px 2px rgba(0, 0, 0, 0.10);
`;

const HeaderLeftWrap = styled.div`
  display: flex;
  align-items: center;

`;

const NavList = styled.div`
  height: 42px;
  gap:45px;
  display: flex;
  margin-left: 530px;
  border: 1px solid ${(props) => (props.liveup ? '#ffffff' : 'black')}; 
  border-radius: 30px;
  padding-left: 50px;
  padding-right: 50px;
  margin-right:20px;
  align-items: center;
`;

const RightList = styled.div`
  height: 42px;
  display: flex;
  margin-right: 5px;
  border-radius: 30px;
  padding-right: 16px;
  padding-left: 16px;
  align-items: center;

  background-color: ${(props) => (props.login ? '#00D749' : 'transparent')};
  border: 1px solid #00D749;
  color: ${(props) => (props.signup ? '#00D749' : props.liveup ? 'rgb(0, 0, 0)' : '#ffffff')};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  cursor: pointer;
`;

const NavItem = styled.div`
  list-style: none;

  a {
    text-decoration: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    color: ${(props) => (props.active && !props.liveup ? 'black' : props.active && props.liveup ? '#ffffff' : '#8D8D8D')};
  }
`;

const AuthItem = styled.div`
  list-style: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;

`;

const Header = () => {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const user = useSelector((state) => state.user.value)
  const loginModal = useSelector((state) => state.loginModal.value)
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(openLoginModal())
    console.log("open")
  };

  const handleLogout = async() =>{
    try{
      const response = await AuthApi.logout();
      console.log('logout success: ', response);
      dispatch(logout());
    }catch(error){
      console.log('logout failed: ', error);
    }
  }

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 10); // 스크롤 위치가 10px 이상이면 true로 설정
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const navItems = [
    { id: 1, label: 'MAIN', link: '/' },
    { id: 2, label: 'GROW ROOM', link: '/growroom' },
    { id: 3, label: 'LIVE UP', link: '/liveup' },
    { id: 4, label: 'MY PAGE', link: '/mypage' }
  ];
  const isLiveUpPage = location.pathname.startsWith('/liveup');
  const logoImage = isLiveUpPage ? liveuplogo : logo;
  return (
    <HeaderContainer liveup={isLiveUpPage} scrolled={scrolled}>
      <HeaderLeftWrap>
        <Link to="/">
          <img style={{ width: '170px', height: '50px' }} src={logoImage} alt="로고" />
        </Link>
        <NavList liveup={isLiveUpPage}>
          {navItems.map((item) => (
            <NavItem key={item.id} active={activeLink === item.link || (item.link === '/' && activeLink === '')} liveup={isLiveUpPage}>
              <Link
                className={`header-nav-item ${activeLink === item.link ? 'active' : ''}`}
                to={item.link}
                onClick={() => handleLinkClick(item.link)}
              >
                {item.label}
              </Link>
            </NavItem>
          ))}
        </NavList>
      </HeaderLeftWrap>
      {user.isLogin ? 
      (<RightList login={true} onClick={handleLogout}>
        <AuthItem>
        로그아웃
      </AuthItem>
      </RightList>) :
        (<>
          <RightList login={true} signup={false} liveup={isLiveUpPage} onClick={handleLoginClick}>
            <AuthItem>
              로그인
            </AuthItem>
          </RightList>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <RightList signup={true}>
              <AuthItem>
                회원가입
              </AuthItem>
            </RightList>
          </Link>
        </>)}
      {loginModal.showLoginModal ? <LoginBox /> : <></>
      }
    </HeaderContainer>
  );
};

export default Header;
