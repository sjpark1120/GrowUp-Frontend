import React from 'react';
import styled from 'styled-components';

const TodoListContainer = styled.div`
margin-left : auto;
display: flex;
padding: 30px;
flex-direction: column;
align-items: flex-start;
gap: 25px;

border-radius: 8px;
background: #F7F7F7;
box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.10);
`

const Title = styled.h2`
color:#090909;
font-style: normal;
fontSize: 20;
font-weight: 600;
line-height: 140%;
`

const TodoContainer = styled.div`
display: flex;
width: 568px;
align-items: flex-start;
align-content: flex-start;
gap: 17px 34px;
flex-wrap: wrap;
`

const Input = styled.textarea`
display: flex;
padding: 10px;
align-items: center;
gap: 5px;
align-self: stretch;`

const TodoList = () => {

    return (
        <TodoListContainer>
            <Title>To Do List</Title>
            <TodoContainer></TodoContainer>
            <Input/>
        </TodoListContainer>
    );
}

export default TodoList;