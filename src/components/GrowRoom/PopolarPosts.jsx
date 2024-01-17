import React, { useState } from 'react';
import styled from 'styled-components';
import PostBox from '../../components/common/PostBox';
import btn_left from '../../icon/Page button_1.png';
import btn_right from '../../icon/Page button_2.png';

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

const PopularPosts = ({ data }) => {
  const itemsPerPage = 4;
  const totalItems = data.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = currentIndex + itemsPerPage;
    setCurrentIndex(nextIndex >= totalItems ? 0 : nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex - itemsPerPage;
    setCurrentIndex(prevIndex < 0 ? Math.floor((totalItems - 1) / itemsPerPage) * itemsPerPage : prevIndex);
  };

  const weekPost = data.slice(currentIndex, currentIndex + itemsPerPage);

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
            key={index}
            deadline={post.deadline}
            maintext={post.maintext}
            views={post.views}
            status={post.status}
            like={post.like}
            popular={post.popular}
            study={post.study}
          />
        ))}
      </PostContainer>
    </div>
  );
};

export default PopularPosts;
