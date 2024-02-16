import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import GrowRoomNavigation from '../../components/GrowRoom/GrowRoom/GrowRoomNavigation';
import { useNavigate } from 'react-router-dom';
import GrowRoomApi from '../../apis/GrowRoomApi'

import {dummyData} from '../.././DummyData'
import banner from '../../icon/banner2.png'
import Dropdown from '../../components/GrowRoom/GrowRoom/DropDown';
import SearchBar from '../../components/GrowRoom/GrowRoom/SearchBar';
import PageNavigation from '../../components/GrowRoom/GrowRoom/PageNavigation';
import PopularPosts from '../../components/GrowRoom/GrowRoom/PopolarPosts';

const TopBanner =styled.img`
min-width: 1280px;
max-width: 100%;
height: auto;
margin-top: 122px;
  `;

const MainWrapper = styled.div`
  width: 1280px; //1220 + 60
  align-items: center;
  justify-content: center;
  margin: 160px auto;
  padding: 0px 30px;
`;

const Title = styled.h2`
  color: black;
  font-size: 25px;
  font-weight: 800;
  align-items: center;
`;

const Button = styled.button`
  height: 42px;
  padding: 6px 16px;
  align-items: center;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  cursor: pointer;
`;

export const FilterBtn = styled(Button)`
 background: #FFF;
  border: 1px solid ${({ isActive }) => (isActive ? '#00D749' : '#B0B0B0')};
  color: ${({ isActive }) => (isActive ? '#00D749' : '#3E3E3E')};
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

const dropdown_period=['1주일', '1개월', '1년'];


const GrowRoomPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useState('전체');

  const handleNavItemChange = (item) => {
    setSelectedNavItem(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('불러올 post 분야:', selectedNavItem);
        const selectedItem = selectedNavItem.replace(/\p{Emoji}/gu, ''); // 이모지를 제외
        const data = await GrowRoomApi.getPosts(encodeURIComponent(selectedItem));
        setPosts(data);
      } catch (error) {
        console.error('post 데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [selectedNavItem]);

  const handleButtonClick = () => {
    //모집중만 보기 버튼 클릭
    setIsActive(!isActive);
  };

  const navigate = useNavigate(); // useNavigate를 사용

  const handleWriteButtonClick = () => {
    // "/growroom/write" 경로로 이동
    navigate('/growroom/write');
  };


  return (
    <div>
    <TopBanner src={banner} alt="banner" />
    <MainWrapper>
      <PopularPosts
        data = {dummyData} 
        />
      <div style={{ paddingBottom: '50px', display: 'flex'}}>
        <Title>GROW ROOM </Title>
        <GrowRoomNavigation 
        navItems={navigation}
        selectedNavItem={selectedNavItem}
        onNavItemChange={handleNavItemChange}  />
      </div>
      
      <div style={{ paddingBottom: '30px', display: 'flex', gap: '10px'}}>
        <Dropdown 
          title="분야"
          optionsMap={dropdown_feild}
           />
        <Dropdown 
          title="기간"
          options={dropdown_period} />

        <FilterBtn isActive={isActive} onClick={handleButtonClick}>
          👀모집 중만 보기
          </FilterBtn>

        <div style={{display: 'flex', marginLeft:'auto', gap: '10px'}} >
          <SearchBar/>
          <WriteBtn onClick={handleWriteButtonClick}>글쓰기</WriteBtn>
        </div>
      </div>
      <PageNavigation data={posts}/>
    </MainWrapper>
    </div>
  );
};

export default GrowRoomPage;
