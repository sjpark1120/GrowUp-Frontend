import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import UserRanking from './UserRanking'
import greenarrowRight from '../../icon/greenarrow_right.png'
import greenarrowLeft from '../../icon/greenarrow_left.png'

const RankingSwiper = styled.div`
  display: flex;
  width: 1199px;
  height: 100px;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
  background: #292929;
  margin-top: 30px;
  margin-left: 10px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`
const OverflowBoxRight = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 114px;
  background: linear-gradient(-90deg, #1C1C1C 31.77%, #1C1C1C 31.78%, rgba(28, 28, 28, 0.00) 100%);
`
const RightBtn = styled.img`
    position: absolute;
    right: 2px;
    top: 40px;
    cursor: pointer;
`
const OverflowBoxLeft = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 114px;
  background: linear-gradient(90deg, #1C1C1C 31.77%, #1C1C1C 31.78%, rgba(28, 28, 28, 0.00) 100%);
`
const LeftBtn = styled.img`
    position: absolute;
    left: 0;
    top: 40px;
    cursor: pointer;
`

function RankingBox() {
  const swiperRef = useRef();
  const [isScrollRight, setIsScrollRight] = useState(true);
  const scrollRight = () => {
    swiperRef.current.scrollLeft += 2000;
    setIsScrollRight(false);
  }
  const scrollLeft = () => {
    swiperRef.current.scrollLeft -= 2000;
    setIsScrollRight(true);
  };
  return (
    <div style={{ position: 'relative'}}>
      <RankingSwiper ref={swiperRef}>
        {Array.from({ length: 10 }).map((_, idx) => (
          <UserRanking key={idx} rank={idx + 1} />
        ))}
        {isScrollRight ? (
          <OverflowBoxRight>
            <RightBtn src={greenarrowRight} onClick={scrollRight} />
          </OverflowBoxRight>
        ) : (
          <OverflowBoxLeft>
          <LeftBtn src={greenarrowLeft} onClick={scrollLeft}/>
        </OverflowBoxLeft>
        )}
      </RankingSwiper>

    </div>
  )
}

export default RankingBox