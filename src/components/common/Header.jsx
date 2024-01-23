import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './growupLogo.jpeg';

// 스타일드 컴포넌트 생성
const HeaderContainer = styled.div`
  margin-top: 20px;
  max-width: 1920px;
  height: 64px;
  display: flex;
  align-items: center;
  margin-bottom:20px;
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
  border: 2px solid black;
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
      color: ${(props) => (props.login ? '#ffffff' : '#00D749')};
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
    color: ${(props) => (props.active ? 'black' : '#8D8D8D')};
    font-weight:600
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

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const navItems = [
    { id: 1, label: 'MAIN', link: '/' },
    { id: 2, label: 'GROW ROOM', link: '/growroom' },
    { id: 3, label: 'LIVE UP', link: '/liveup' },
    { id: 4, label: 'MY PAGE', link: '/mypage' }
  ];

  return (
    <HeaderContainer>
        <HeaderLeftWrap>
          <Link to="/">
            <img style={{ width: '170px', height: '50px' }} src={logo} alt="로고" />
          </Link>
          <NavList>
            {navItems.map((item) => (
              <NavItem key={item.id} active={activeLink === item.link}>
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
