import React from 'react';
import styled from 'styled-components';
import icon_search from '../../../icon/search.png';

const SearchContainer = styled.div`
    display: flex;
    height: 42px;
    padding: 6px 16px;
    align-items: center;
    gap: 38px;
    border-radius: 30px;
    border: 1px solid #B0B0B0;
    background: #F7F7F7;
`;

const SearchInput = styled.input`
  width: 232px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19.60px;
  border: none;
  outline: none;
  background: #F7F7F7;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px; 
`;

const SearchBar = () => {
  return (
      <SearchContainer>
        <SearchInput placeholder="편집 디자인 취준 스터디"/>
        <SearchIcon src={icon_search} alt="Search" />
      </SearchContainer>
  );
};

export default SearchBar;
