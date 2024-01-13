import React from 'react'
import Img from '../../icon/Ellipse 129.png'
import styled from 'styled-components'

const RankWrapper = styled.div`
  display: flex;
  min-width: 194px;
height: 80px;
padding: 10px 24px;
align-items: center;
gap: 10px;
`

const RankingNum = styled.h1`
  color:#00D749;
font-size: 25px;
font-weight: 800;
line-height: 140%;
display: inline;
`
const ProfileImg = styled.img`
  width: 45px;
height: 45px;
border-radius: 45px;
`
const RankerName = styled.div`
  color: #FFF;
font-size: 12px;
font-weight: 600;
line-height: 140%;
`
const RankerTime = styled.div`
  color: #B0B0B0;
font-size: 12px;
font-weight: 600;
line-height: 140%;
`
function UserRanking({ rank }) {
  return (
    <RankWrapper>
    <RankingNum>{rank}</RankingNum>
    <ProfileImg src={Img}/>
    <div>
      <RankerName>유아담</RankerName>
      <RankerTime>1252:65:25</RankerTime>
    </div>
    </RankWrapper>
  )
}

export default UserRanking