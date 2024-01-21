import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import left_arrow from '../../../icon/greenarrow_left.png';


const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 1000px;
  padding: 10px 20px;
  margin: auto;
  margin-top:90px;
  background-color: #fff;  // 헤더 배경색을 원하는 색상으로 수정해주세요.
  color: #B0B0B0;  // 헤더 텍스트 색상을 원하는 색상으로 수정해주세요.
`;


const HeaderLogo = styled.img`
  height: 20px;  // 이미지 높이를 조절해주세요.
  margin-right:10px;
`;
const HeaderLink = styled.span`
  text-decoration: none;
  color: #B0B0B0;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PostHeader = () => {
  const navigate = useNavigate();

  const navigateToGrowroom = () => {
    navigate('/growroom');
  };

  return (
    <HeaderContainer>
      <HeaderLogo src={left_arrow} alt="Header Logo" />
      <HeaderLink onClick={navigateToGrowroom}>목록으로</HeaderLink>
    </HeaderContainer>
  );
};

export default PostHeader;
