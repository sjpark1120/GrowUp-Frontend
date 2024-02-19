import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import gofirst_arrow from '../../icon/arrow7.png'
import gofirst_arrow_disable from '../../icon/arrow11.png'
import goprev_arrow from '../../icon/arrow1.png'
import goprev_arrow_disable from '../../icon/arrow5.png'
import golast_arrow from '../../icon/arrow8.png'
import golast_arrow_disable from '../../icon/arrow9.png'
import gonext_arrow from '../../icon/arrow2.png'
import gonext_arrow_disable from '../../icon/arrow3.png'
import LiveupParticipantBox from './LiveupParticipantBox';
import LiveUpApi from '../../apis/LiveUpApi';

const Title = styled.p`
  color: #FFF;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  line-height: 140%;
  text-align: center;
`

const Label = styled.p`
  color: #FFF;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
`;

const PostBoxContainer = styled.div`
  width: 100%;
  max-width: 1220px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px 16px;
  margin-top: 50px;
`
const Paginaion = styled.div`
  margin-top: 150px;
  margin-bottom: 150px;
  display: flex;
  padding: 0px 360px;
  justify-content: center;
  align-items: center;
  gap: 30px;
`
const GotoFirstBtn = styled.button`
  border: 0;
  background-color: transparent;
  background-image: url(${gofirst_arrow});
  width: 10px;
  height: 10px;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  &:disabled {
    background-image: url(${gofirst_arrow_disable});
    cursor: default;
  }
`
const GotoPrevtBtn = styled.button`
  border: 0;
  background-color: transparent;
  background-image: url(${goprev_arrow});
  width: 10px;
  height: 10px;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  &:disabled {
    background-image: url(${goprev_arrow_disable});
    cursor: default;
  }
`

const GotoLastBtn = styled.button`
  border: 0;
  background-color: transparent;
  background-image: url(${golast_arrow});
  width: 10px;
  height: 10px;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  &:disabled {
    background-image: url(${golast_arrow_disable});
    cursor: default;
  }
`
const GotoNexttBtn = styled.button`
  border: 0;
  background-color: transparent;
  background-image: url(${gonext_arrow});
  width: 10px;
  height: 10px;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  &:disabled {
    background-image: url(${gonext_arrow_disable});
    cursor: default;
  }
`

const NumberBtn = styled.button`
  width: 24px;
  height: 24px;
  border: 0;
  background-color: transparent;
  color: #8D8D8D;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 4px 7.686px 4px 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 140%;
  border-radius: 30px;
  cursor: pointer;
`

const NavItem = ({ label, selected, onClick }) => {
    return (
        <div
            style={{ opacity: selected ? 1 : 0.5, display: 'flex', cursor: 'pointer' }}
            onClick={onClick}
        >
            <Label>{label}</Label>
        </div>
    );
};

const navItems = ['전체', '🏅랭킹순', '😊이름순', '💚관심등록'];
function LiveUpParticipantList() {
  const [selectedNavItem, setSelectedNavItem] = useState('전체');
  const [filter, setfilter] = useState('전체');
  

    const handleNavItemClick = (label) => {
        setSelectedNavItem(label);
        if (label === "전체"){
            setfilter("전체");
            console.log("전체 선택")
        }else if(label === "🏅랭킹순"){
            setfilter("랭킹순");
            console.log("랭킹순")
        }else if(label === "😊이름순"){
            setfilter("이름순");
            console.log("이름순")
        }else if(label === "💚관심등록"){
            setfilter("관심등록순");
            console.log("관심등록순")
        }

  };

  const [participant, setParticipant] = useState([]);
  const handleGetParticipant = async (growRoomId, filter) => {
    try{
      const response = await LiveUpApi.getparticipant(growRoomId, filter);
      //console.log(response.result.participateInquiryList);
      setParticipant(response.result.participateInquiryList);
    }catch (error){
      console.error("참여자 목록 가져오기 실패", error);
    }
  } 

  useEffect(()=>{
    const path = window.location.pathname;
    const segments = path.split('/');
    const id = segments[segments.length - 1];
    //console.log("roomid", id)
    handleGetParticipant(id, filter);
  },[filter])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 한 페이지에 표시할 항목 수
  const totalPages = Math.ceil(participant.length / itemsPerPage); // 전체 페이지 수

  // 현재 페이지에 해당하는 데이터 추출
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = participant.slice(startIndex, endIndex);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
  
    if (totalPages <= maxPagesToShow) {
      // 전체 페이지가 최대 페이지 수 이하이면 모든 페이지를 표시
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 동적으로 표시할 페이지 번호의 범위
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
      // 끝 5개 표시
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      if (startPage > 1) {
        pageNumbers.push(1, '...');
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (endPage < totalPages) {
        pageNumbers.push('...', totalPages);
      }
    }
  
    return pageNumbers;
  };

  const handleDynamicPageClick = (direction) => {
    let newPage;
  
    if (direction === 'right') {
      newPage = Math.min(currentPage + 1, totalPages);
    } else if (direction === 'left') {
      newPage = Math.max(currentPage - 1, 1);
    } else if (direction === 'dynamicRight') {
      newPage = Math.min(currentPage + 5, totalPages);
    } else if (direction === 'dynamicLeft') {
      newPage = Math.max(currentPage - 5, 1);
    }
  
    setCurrentPage(newPage);
  };

    return (
      <>
        <div style={{ alignItems: 'center', gap: 30, display: 'inline-flex' }}>
        <Title>LIVE UP 참여자</Title>
            {navItems.map((item, index) => (
                <NavItem 
                    key={index}
                    label={item}
                    selected={selectedNavItem === item}
                    onClick={() => handleNavItemClick(item)} />
            ))}
        </div>

        <PostBoxContainer>
        {currentData.map((data, index) => (
            <LiveupParticipantBox
              key={index}
              like={data.liked}
              bestUp={true}
              sevenDaysUp={true}
              nickName={data.nickName}
              userId={data.userId}
              photoUrl={data.photoUrl}
              time={data.totalTime}
            />
        ))}
      </PostBoxContainer>

      <Paginaion>
        <GotoFirstBtn disabled={currentPage === 1} onClick={goToFirstPage} />
        <GotoPrevtBtn disabled={currentPage === 1} onClick={() => handleDynamicPageClick('left')} />
        {generatePageNumbers().map((page, index) => (
          <NumberBtn
            key={index}
            onClick={() => {
              if (typeof page === 'number') {
                handlePageClick(page);
              } else {
                const direction = page === '...' && index === 1 ? 'dynamicLeft' : 'dynamicRight';
                handleDynamicPageClick(direction);
              }
            }}
            style={{
              color: currentPage === page ? '#00D749' : '#8D8D8D',
              border: currentPage === page ? '1px solid #00D749' : 'none',
            }}
          >
            {page}
          </NumberBtn>
        ))}
        <GotoNexttBtn disabled={currentPage === totalPages} onClick={() => handleDynamicPageClick('right')}/>
        <GotoLastBtn disabled={currentPage === totalPages} onClick={goToLastPage}/>
      </Paginaion>
      </>
    );
}

export default LiveUpParticipantList