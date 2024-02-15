import React from 'react'
import styled from 'styled-components';

import banner from '../../icon/banner2.png';
import banner1 from '../../icon/banner3.png';
import banner2 from '../../icon/banner4.png';

import PopularPosts from '../../components/GrowRoom/GrowRoom/PopolarPosts';
import {dummyData} from '../../DummyData';

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

const Banner = styled.img`
  width: 1220px;
  height: 450px;
  margin-bottom: 100px;
`
function MainPage() {
  return (
    <div>
    <TopBanner src={banner} alt="banner" />
      <MainWrapper>
        <PopularPosts
          data={dummyData}
        />
        <Banner src={banner1} alt="banner1" />
        <Banner src={banner2} alt="banner2" />
      </MainWrapper>

    </div>
  )
}

export default MainPage