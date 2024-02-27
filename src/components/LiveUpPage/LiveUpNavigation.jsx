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


const LiveUpNavigation = ({ setfilter }) => {
    const [selectedNavItem, setSelectedNavItem] = useState('전체');

    const handleNavItemClick = (label) => {
        setSelectedNavItem(label);
        if (label === "전체"){
            setfilter("전체");
            console.log("전체 선택")
        }else if(label === "📝내 모집글"){
            setfilter("내 모집글");
            console.log("내모집글 선택")
        }else if(label === "🤲참여글"){
            setfilter("참여글");
            console.log("참여글 선택")
        }else if(label === "💚관심글"){
            setfilter("관심글");
            console.log("관심글선택")
        }

    };

    return (
        <div style={{ paddingLeft: '30px', gap: 30, display: 'inline-flex' }}>

            {navItems.map((item, index) => (
                <NavItem 
                    key={index}
                    label={item}
                    selected={selectedNavItem === item}
                    onClick={() => handleNavItemClick(item)} />
            ))}
        </div>
    );
};

export default LiveUpNavigation;