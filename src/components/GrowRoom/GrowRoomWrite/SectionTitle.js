// SectionTitle.js
import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  width: 850px;
  font-weight: 600;
  font-size: 18px;
  border-bottom: solid 2px #B0B0B0;
  padding-bottom: 20px;
`;

const Circle = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #00D749;
  margin-right: 15px;
`;

const SectionTitle = ({ children }) => (
  <TitleWrapper>
    <Circle></Circle>
    {children}
  </TitleWrapper>
);

export default SectionTitle;
