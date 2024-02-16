import React, { useState } from 'react';
import styled from 'styled-components';

const Label = styled.button`
  background-color: transparent;
  width: 57px;
  height: 42px;
  border: 1px solid #ffffff;
  border-radius: 30px;
  color: #ffffff;
  cursor: pointer;

  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
`;

const NavItem = ({ label, selected, onClick }) => {
    return (

            <Label style={{ color: selected ? '#00D749' : '#ffffff', borderColor: selected ? '#00D749' : '#ffffff'}}
            onClick={onClick}>{label}</Label>
    );
};

const navItems = ['전체', '주간', '월간'];


const RankingFilterBtn = () => {
    const [selectedFilter, setSelectedFilter] = useState('전체');

    const handleFilterClick = (label) => {
        setSelectedFilter(label);

    };

    return (
        <div style={{ paddingLeft: '10px', gap: 10, display: 'inline-flex' }}>
            {navItems.map((item, index) => (
                <NavItem
                    key = {index} 
                    label={item}
                    selected={selectedFilter === item}
                    onClick={() => handleFilterClick(item)} />
            ))}
        </div>
    );
};

export default RankingFilterBtn;