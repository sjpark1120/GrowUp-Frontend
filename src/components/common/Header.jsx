import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from './growupLogo.jpeg';
import liveuplogo from './liveupLogo.jpeg';

const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 122px;
  max-width: 1920px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${(props) => (props.liveup ? '#000000' : 'white')};
  z-index:9999;
`;

const HeaderLeftWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-left: 200px; 

`;
const NavList = styled.div`
  display: flex;
  margin-left: 250px;
  border: 2px solid ${(props) => (props.liveup ? '#ffffff' : 'black')}; 
  border-radius: 30px;
  padding-left: 30px;
  padding-right: 30px;
  margin-right:20px;

`;

const RightList = styled.div`
  display: flex;
  margin-right: 5px;
  margin-top: 30px;
  border-radius: 30px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  &:not(:first-child) {
    background-color: ${(props) => (props.login ? '#00D749' : '#ffffff')};
    border: 2px solid ${(props) => (props.login ? '#00D749' : '#00D749')};
    
    a {
      text-decoration: none;
      color: ${(props) => (props.active ? '#ffffff' : '#8D8D8D')};
      font-weight:600
    }
  }
`;

const NavItem = styled.div`
  padding: 8px;
  margin-right: 14px;
  list-style: none;

  a {
    text-decoration: none;
    font-weight: 600;
    color: ${(props) => (props.active && !props.liveup ? 'black' : props.active && props.liveup ? '#ffffff' : '#8D8D8D')};
  }
`;



const AuthLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.signup ? '#00D749' : 'rgb(0, 0, 0)')};
 
`;

const AuthItem = styled.div`
  list-style: none;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  margin-left: 5px;
`;

const Header = () => {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);


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
      <RightList login>
        <AuthItem>
          <AuthLink to="/login" signup={false}>
            로그인
          </AuthLink>
        </AuthItem>
      </RightList>
      <RightList>
        <AuthItem>
          <AuthLink to="/signup" signup>
            회원가입
          </AuthLink>
        </AuthItem>
      </RightList>
    </HeaderContainer>
  );
};

export default Header;
