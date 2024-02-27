import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import plus_btn from '../../icon/plus_btn.png';
import TodoListApi from '../../apis/TodoListApi';

const TodoListContainer = styled.div`
  margin-left: auto;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  border-radius: 8px;
  background: #F7F7F7;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.07);
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
  &::placeholder { 
    color: #B0B0B0;
  }
`;

const AddButton = styled.img`
  cursor: pointer;
`;

const TodoList = ({ todoList }) => {
  const [todos, setTodos] = useState(todoList || []);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    setTodos(todoList || []);
  }, [todoList]);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        const response = await TodoListApi.postTodo({ comment: newTodo });
        console.log('새로운 todo가 등록되었습니다:', response);
        const newTodoObj = await TodoListApi.getTodo();
        setTodos(newTodoObj);
        setNewTodo(''); // 입력 필드 초기화
      } catch (error) {
        console.error('새로운 todo 등록 중 오류 발생:', error);
      }
    }
  };

  const handleToggleComplete = async (index) => {
    try {
       //id를 /${todoList} querystring으로 전달
      const todoListId = todos[index].todoListId;
      const response = await TodoListApi.checkTodo(todoListId);
      console.log('todo 상태 변경 완료:', response);
      // 상태 변경 후 UI 업데이트
      setTodos(prevTodos => {
        return prevTodos.map((todo, i) => {
          if (i === index) {
            return { ...todo, status: todo.status === 'ACTIVE' ? 'NONACTIVE' : 'ACTIVE' };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error('todo 상태 변경 중 오류 발생:', error);
    }
  };
  

  return (
    <TodoListContainer>
      <Title>✔️ TO DO LIST</Title>
      <TodoContainer>
        {todos && todos.length > 0 && todos.map((todo, index) => (
          <div key={index} style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
            <CheckBox onClick={() => handleToggleComplete(index)} style={{ backgroundColor: todo.status === 'ACTIVE' ? '#00D749' : 'transparent' }} />
            <TodoText>{todo.comment}</TodoText>
          </div>
        ))}
      </TodoContainer>
      <InputContainer>
        <AddButton src={plus_btn} onClick={handleAddTodo} alt="add todo"/>
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
