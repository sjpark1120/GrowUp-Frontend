import React, { useState } from 'react';
import styled from 'styled-components';

const Label = styled.p`
  color: #FFF;
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

const navItems = ['전체', '📝내 모집글', '🤲참여글', '💚관심글'];


const LiveUpNavigation = () => {
    const [selectedNavItem, setSelectedNavItem] = useState('전체');

    const handleNavItemClick = (label) => {
        setSelectedNavItem(label);

    };

    return (
        <div style={{ paddingLeft: '30px', gap: 30, display: 'inline-flex' }}>

            {navItems.map((item, index) => (
                <NavItem label={item}
                    selected={selectedNavItem === item}
                    onClick={() => handleNavItemClick(item)} />
            ))}
        </div>
    );
};

export default LiveUpNavigation;