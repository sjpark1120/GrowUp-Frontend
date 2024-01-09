import React from 'react';
import styled from 'styled-components';
import PostBox from '../../components/common/PostBox';

const Container = styled.div`
  color: black;
  font-size: 25px;
  font-family: 'Pretendard';
  font-weight: 800;
  padding-bottom:35px;
`;

const GrowRoomPage = () => {
  return (
    <div>
    <Container>
      🔥 이번주 인기 GROW ROOM
    </Container>
    <PostBox />
    </div>
  );
};

export default GrowRoomPage;
