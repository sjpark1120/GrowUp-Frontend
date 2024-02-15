import React from 'react';
import styled from 'styled-components';

const Label = styled.p`
  color: black;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
`;

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

const GrowRoomNavigation = ({ navItems, selectedNavItem, onNavItemChange }) => {
  
  const handleNavItemClick = (label) => {
    const selectedItem = label.replace(/\p{Emoji}/gu, ''); // 이모지를 제외
    onNavItemChange(selectedItem);
  };

  return (
    <div style={{ paddingLeft: '30px', gap: 30, display: 'inline-flex' }}>
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          label={item}
          selected={selectedNavItem === item}
          onClick={() => handleNavItemClick(item)}
        />
      ))}
    </div>
  );
};

export default GrowRoomNavigation;
