import React, { useState } from 'react';
import styled from 'styled-components';
import PostBox from '../../components/common/PostBox';
import GrowRoomNavigation from '../../components/GrowRoom/GrowRoomNavigation';

import btn_left from '../../icon/Page button_1.png';
import btn_right from '../../icon/Page button_2.png';
import Dropdown from '../../components/GrowRoom/DropDown';
import SearchBar from '../../components/GrowRoom/SearchBar';


const Title = styled.h2`
  color: black;
  font-size: 25px;
  font-weight: 800;
  align-items: center;
`;

const ThisWeekContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 150px;
`;

const Button = styled.button`
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
`;

export const FilterBtn = styled(Button)`
  border: 1px solid #B0B0B0;
  background: #FFF;
  color:#3E3E3E;
`;

export const WriteBtn = styled(Button)`
  border: 1px solid #00D749;
  background: #00D749;
  color:#FFF;
  `;

const navigation = ['전체', '✨내 모집글', '💚관심글', '📂프로젝트', '✏️스터디', '🥇챌린지'];
const dropdown_feild = {
  'IT/미디어': ['스터디', '인공지능', '데이터분석'],
  '스포츠/헬스': ['스포츠1', '스포츠2', '스포츠3'],
  '공부/자격증': ['스터디1', '스터디2', '스터디3'],
  '미술/디자인': ['미술1', '미술2', '미술3'],
  '공모전/프로젝트': ['플젝1', '플젝2', '플젝3'],
};


const dummy = [
  {
    deadline: "2023.12.05",
    maintext: "이제 막 공부 시작한 디자이너와 프론트엔드 개발자를 구합니다! 어서 오세요요용",
    views: 1500,
    status: "open", //close or open
    like: "like", //like or unlike
    popular: true, //인기태그 표시 여부
    study: true, //스터디 태그 표시 여부
  },
  {
    deadline: "2023.12.05",
    maintext: "예시글입니다예시글입니다아아아아아안녕하세요모집합니다구합니다",
    views: 143,
    status: "close",
    like: "like",
    popular: true,
    study: false, 
  },
  {
    deadline: "2023.12.05",
    maintext: "범위초과시 ...으로표시합니다",
    views: 12,
    status: "close",
    like: "unlike",
    popular: true,
    study: true,
  },
  {
    deadline: "2023.12.05",
    maintext: "dummy data 현재 활용중입니다 이후 api 연결시 dummy 지움",
    views: 998,
    status: "open",
    like: "like",
    popular: true,
    study: true,
  },
  {
    deadline: "2023.12.05",
    maintext: "5번째글입니다 안녕하세요안녕하세요안녕하세요",
    views: 998,
    status: "open",
    like: "like",
    popular: true,
    study: true,
  },
];

const GrowRoomPage = () => {

  //이번주 인기 growroom 구현
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

  const weekPost = dummy.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div style={{width: '1220px' , alignItems: 'center', justifyContent: 'center' ,margin: '0 auto' }}>
      <div style={{justifyContent: 'space-between', display: 'flex', paddingBottom: '35px'}}>
      <Title>🔥 이번주 인기 GROW ROOM </Title>
          <div style={{ display: 'flex'}}>
            <img src={btn_left} alt="Left Button" onClick={handlePrev}/>
            <img src={btn_right} alt="Right Button" onClick={handleNext}/>
          </div>
      </div>
      <ThisWeekContainer>
        {weekPost.map((data, index) => (
          <PostBox
            key={index}
            deadline={data.deadline}
            maintext={data.maintext}
            views={data.views}
            status={data.status}
            like={data.like}
            popular={data.popular}
            study={data.study}
          />
        ))}
      </ThisWeekContainer>

      <div style={{ paddingBottom: '50px', display: 'flex'}}>
        <Title>GROW ROOM </Title>
        <GrowRoomNavigation navItems={navigation} />
      </div>
      
      <div style={{ paddingBottom: '30px', display: 'flex', gap: '10px'}}>
        <Dropdown 
          title="분야"
          optionsMap={dropdown_feild}
           />
        <Dropdown 
          title="기간"
          options={['1주일', '1개월', '1년']} />
        <FilterBtn
          onClick
          >👀모집 중만 보기</FilterBtn>
        <div style={{display: 'flex', marginLeft:'auto', gap: '10px'}} >
          <SearchBar/>
          <WriteBtn>글쓰기</WriteBtn>
        </div>
      </div>
      <ThisWeekContainer>
        {dummy.map((data, index) => (
          <PostBox
            key={index}
            deadline={data.deadline}
            maintext={data.maintext}
            views={data.views}
            status={data.status}
            like={data.like}
            popular={data.popular}
            study={data.study}
          />
        ))}
      </ThisWeekContainer>
    </div>
  );
};

export default GrowRoomPage;
