import React, { useState } from 'react';
import styled from 'styled-components';
import PostBox from '../../components/common/PostBox';
import { Link } from 'react-router-dom';
import btn_left from '../../assets/GrowRoomAssets/btn-left.svg';
import btn_right from '../../assets/GrowRoomAssets/btn-right.svg';

const Title = styled.div`
  color: black;
  font-size: 25px;
  font-weight: 800;
  padding-bottom: 35px;
`;

const ThisWeekContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const GrowRoomPage = () => {
  const dummy = [
    {
      deadline: "2023.12.05",
      maintext: "이제 막 공부 시작한 디자이너와 프론트엔드 개발자를 구합니다! 어서 오세요요용",
      hashtags: ["카테고리1","카테고리2","카테고리3"],
      views: 1500,
      status: "open", //close or open
      like: "like", //like or unlike
      popular: true, //인기태그 표시 여부
      study: true, //스터디 태그 표시 여부
    },
    {
      deadline: "2023.12.05",
      maintext: "예시글입니다예시글입니다아아아아아안녕하세요모집합니다구합니다",
      hashtags: ["카테고리1","카테고리2"],
      views: 143,
      status: "close",
      like: "like",
      popular: true,
      study: false, 
    },
    {
      deadline: "2023.12.05",
      maintext: "범위초과시 ...으로표시합니다",
      hashtags: ["카테고리1"],
      views: 12,
      status: "close",
      like: "unlike",
      popular: true,
      study: true,
    },
    {
      deadline: "2023.12.05",
      maintext: "dummy data 현재 활용중입니다 이후 api 연결시 dummy 지움",
      hashtags: ["카테고리1","카테고리2","카테고리3"],
      views: 998,
      status: "open",
      like: "like",
      popular: true,
      study: true,
    },
    {
      deadline: "2023.12.05",
      maintext: "5번째글입니다 안녕하세요안녕하세요안녕하세요",
      hashtags: ["카테고리1","카테고리2","카테고리3"],
      views: 998,
      status: "open",
      like: "like",
      popular: true,
      study: true,
    },
  ];
  const itemsPerPage = 4;
  const totalItems = dummy.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleNext = () => {
    const nextIndex = currentIndex + itemsPerPage;
    setCurrentIndex(nextIndex >= totalItems ? 0 : nextIndex);
  };
  
  const handlePrev = () => {
    const prevIndex = currentIndex - itemsPerPage;
    setCurrentIndex(prevIndex < 0 ? Math.floor(totalItems / itemsPerPage) * itemsPerPage : prevIndex);
  };

  const Posts = dummy.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div style={{width: '1220px' , alignItems: 'center', justifyContent: 'center' ,margin: '0 auto' }}>
      <div style={{justifyContent: 'space-between', display: 'flex'}}>
      <Title> 🔥 이번주 인기 GROW ROOM </Title>
          <div style={{ display: 'flex'}}>
            <img src={btn_left} alt="Left Button" onClick={handlePrev}/>
            <img src={btn_right} alt="Right Button" onClick={handleNext}/>
          </div>
      </div>
      <ThisWeekContainer>
        {Posts.map((data, index) => (
          <PostBox
            key={index}
            deadline={data.deadline}
            maintext={data.maintext}
            hashtags={data.hashtags}
            views={data.views}
            status={data.status}
            like={data.like}
            popular={data.popular}
            study={data.study}
          />
        ))}
        
      </ThisWeekContainer>
      <Link to="/growroom/write">
          <button>글쓰기</button>
        </Link>
    </div>

    
  );
};

export default GrowRoomPage;
