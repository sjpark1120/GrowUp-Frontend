import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import plus_btn from '../../icon/plus_btn.png'
const TodoListContainer = styled.div`
  margin-left: auto;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  border-radius: 8px;
  background: #F7F7F7;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.10);
`;

const Title = styled.h2`
  color: #090909;
  font-style: normal;
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
`;

const TodoContainer = styled.div`
  display: flex;
  width: 628px;
  align-items: flex-start;
  gap: 17px 34px;
  flex-wrap: wrap;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 5px;
  align-self: stretch;
  border-radius: 8px;
  background-color: #FFF;
  width: 100%;
`;

const CheckBox = styled.div`
  width: 15px;
  height: 15px;
  border: 1px #B0B0B0 solid;
  cursor: pointer;
`;

const TodoText = styled.div`
  width: 244px;
  height: 16px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: auto;
`;

const Input = styled.input`
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  font-size: 14px;
  gap: 5px;
  align-self: stretch;
  flex-grow: 1;
  :: placeholder {
    color: #B0B0B0
  };
`;

const TodoList = ({ todoList }) => {
  const [todos, setTodos] = useState(todoList);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    setTodos(todoList || []);
  }, [todoList]);


  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, [newTodo, false]]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index][1] = !updatedTodos[index][1];
    setTodos(updatedTodos);
  };

  return (
    <TodoListContainer>
      <Title>✔️ To Do List</Title>
      <TodoContainer>
        {todos.map((todo, index) => (
          <div key={index} style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
            <CheckBox onClick={() => handleToggleComplete(index)} style={{ backgroundColor: todo[1] ? '#00D749' : 'transparent' }} />
            <TodoText>{todo[0]}</TodoText>
          </div>
        ))}
      </TodoContainer>
      <InputContainer>
        <img src={plus_btn} onClick={handleAddTodo} alt="add todo"/>
        <Input
          placeholder="TO DO LIST 추가"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </InputContainer>
    </TodoListContainer>
  );
};

export default TodoList;