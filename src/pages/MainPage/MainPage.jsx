import React from 'react'
import styled from 'styled-components';

import banner from '../../icon/banner2.png'

const BannerImg =styled.img`
background-image: url(${banner});
background-size: cover;
width: 100%;
height: 500px;
  `;

const MainWrapper = styled.div`
  width: 1220px;
  align-items: center;
  justify-content: center;
  margin: 100px auto;
`;


function MainPage() {
  return (
    <div>
    <BannerImg />
    <MainWrapper>

    </MainWrapper>

    </div>
  )
}

export default MainPage