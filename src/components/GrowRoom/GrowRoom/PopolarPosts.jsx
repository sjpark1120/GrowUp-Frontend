import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostBox from '../../common/PostBox';
import btn_left from '../../../icon/Page button_1.png';
import btn_right from '../../../icon/Page button_2.png';

import GrowRoomApi from '../../../apis/GrowRoomApi';

const Title = styled.h2`
  color: black;
  font-size: 25px;
  font-weight: 800;
  align-items: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 150px;
`;

const PageButton = styled.img`
  shadow: 0px 0px 50px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;
const PopularPosts = () => {
  const [hotPosts, setHotPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotPost = await GrowRoomApi.getHotPosts();
        setHotPosts(hotPost);
      } catch (error) {
        console.error('hot post 데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []); 
  const itemsPerPage = 4;
  const totalItems = hotPosts.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = currentIndex + itemsPerPage;
    setCurrentIndex(nextIndex >= totalItems ? 0 : nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - itemsPerPage;
    setCurrentIndex(prevIndex < 0 ? Math.floor((totalItems - 1) / itemsPerPage) * itemsPerPage : prevIndex);
  };

  const weekPost = hotPosts.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div>
      <div style={{ justifyContent: 'space-between', display: 'flex', paddingBottom: '35px' }}>
        <Title>🔥 이번주 인기 GROW ROOM </Title>
        <div style={{ display: 'flex' }}>
          <PageButton src={btn_left} alt="Left Button" onClick={handlePrev} />
          <PageButton src={btn_right} alt="Right Button" onClick={handleNext} />
        </div>
      </div>
      <PostContainer>
        {weekPost.map((post, index) => (
          <PostBox
            growRoomId={post.growRoomId}
            title={post.title}
            popular={post.hot}
            recruitment_field={post.recruitment_field}
            status={post.status}
            view={post.view}
            deadline={post.endDate}
            like={post.likedByUser}
          />
        ))}
      </PostContainer>
    </div>
  );
};

export default PopularPosts;
