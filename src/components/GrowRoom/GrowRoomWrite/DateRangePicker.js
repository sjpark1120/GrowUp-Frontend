import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

const DatePickerContainer = styled.div`
  .datepicker {
    width: 400px;
    height: 50px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #B0B0B0;
    cursor: pointer;
    background-color: white;
    color: #B0B0B0;
    &:focus {
      outline: none;
      border: 2px solid #00D749;
      color: #00D749;
    }

    .react-datepicker-wrapper {
      width: 98%;
    }

    .react-datepicker__input-container {
      width: 98%;
    }

    .react-datepicker__input-container input {
      width: 100%;
      height: 35px;
      color: #B0B0B0;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      cursor: pointer;
      background-color: white;
    }
  }
  .react-datepicker__portal {
    width: 100%;
  }

  .react-datepicker__header {
    background-color: white; 
    border-bottom: none; 
    margin-top:14px;
  }
  .react-datepicker__day-name {
    color: #00D749;
  }

  .react-datepicker__day {
    color: black;
    &:hover {
      background-color:#00D749;
      color: white;
      border-radius: 10px;
    }
  }

  .react-datepicker__day--selected {
    background-color: #00D749; 
    color: white; 
    border-radius: 10px; 
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    margin-bottom: 10px;
  }

  .react-datepicker__current-month::before {
    content: attr(data-test);
    margin-right: 15px;
  }

  .react-datepicker__month {
    margin: 10px;
  }

  .react-datepicker__week {
    margin-bottom: 10px;
  }

  .react-datepicker__day--outside-month {
    color: #B0B0B0;
  }

  .react-datepicker__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  // 기간 선택 부분을 초록색으로 변경
  .react-datepicker__day--in-range {
    background-color: #00D749;
    color: white;
    border-radius: 0;
  }

  // 기간 선택 시작일 스타일 변경
  .react-datepicker__day--range-start {
    background-color: #00D749;
    color: white;
    border-radius: 10px 0 0 10px;
  }

  // 기간 선택 종료일 스타일 변경
  .react-datepicker__day--range-end {
    background-color: #00D749;
    color: white;
    border-radius: 0 10px 10px 0;
  }
}
`;

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    };
  }

  setChangeDate = (dates) => {
    const [start, end] = dates;
    this.setState({ startDate: start, endDate: end });
  };

  render() {
    return (
      <DatePickerContainer>
        <DatePicker
          selectsRange={true}
          className="datepicker"
          dateFormat="yyyy년 MM월 dd일"
          selected={this.state.startDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={(dates) => this.setChangeDate(dates)}
        />
      </DatePickerContainer>
    );
  }
}

export default UserInfo;
