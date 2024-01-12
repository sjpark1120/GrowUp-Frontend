import React, { useState } from 'react';
import styled from 'styled-components';

const Label = styled.p`
  color: black;
  fontSize: 20px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
`;


const GrowRoomNavigation = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('전체');

  const handleNavItemClick = (label) => {
    setSelectedNavItem(label);

  };

  return (
    <div style={{paddingLeft : '30px', gap: 30, display: 'inline-flex' }}>
      <NavItem label="전체" selected={selectedNavItem === '전체'} onClick={() => handleNavItemClick('전체')} />
      <NavItem label="내 모집글" selected={selectedNavItem === '내 모집글'} onClick={() => handleNavItemClick('내 모집글')} />
      <NavItem label="관심글" selected={selectedNavItem === '관심글'} onClick={() => handleNavItemClick('관심글')} />
      <NavItem label="프로젝트" selected={selectedNavItem === '프로젝트'} onClick={() => handleNavItemClick('프로젝트')} />
      <NavItem label="스터디" selected={selectedNavItem === '스터디'} onClick={() => handleNavItemClick('스터디')} />
      <NavItem label="챌린지" selected={selectedNavItem === '챌린지'} onClick={() => handleNavItemClick('챌린지')} />
    </div>
  );
};

const NavItem = ({ label, selected, onClick }) => {
  return (
    <div
      style={{ opacity: selected ? 1 : 0.5, display: 'flex',cursor: 'pointer'}}
      onClick={onClick}
    >
      <Label>{label}</Label>
    </div>
  );
};

export default GrowRoomNavigation;
