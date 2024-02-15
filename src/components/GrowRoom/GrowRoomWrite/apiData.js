import axios from 'axios';
import GrowRoomWriteApi from '../../../apis/GrowRoomWriteApi';

let selectedOption = null;
let selectedIndex = null;
let selectStartDate = null;
let selectEndDate = null;
let selectTitle = null;
let selectContent = null;

let defaultBody = {
  recruitmentId: 1,
  numberId: 1,
  periodId: 1,
  startDate: 1,
  endDate: 1,
  categoryDetailIds: [],
  title: "GrowRoom 제목",
  content: "GrowRoom 내용"
};

const setApiData = async (categoryType, index) => {
  selectedOption = categoryType;
  selectedIndex = index + 1;

  // selectedOption에 따라 defaultBody 업데이트
  if (selectedOption === 1) {
    console.log('Updating recruitmentId:', selectedIndex);
    defaultBody.recruitmentId = selectedIndex;
  } 
  else if (selectedOption === 2) {
    console.log('Updating numberId:', selectedIndex);
    defaultBody.numberId = selectedIndex;
  } 
  else if (selectedOption === 3) {
    console.log('Updating periodId:', selectedIndex);
    defaultBody.periodId = selectedIndex;
  } 
  else if (selectedOption >= 4 && selectedOption <= 8) {
    console.log('Entering categoryDetailIds condition');
    console.log('Before push - categoryDetailIds:', defaultBody.categoryDetailIds);
  
    defaultBody.categoryDetailIds.push(selectedIndex);
  
    console.log('After push - categoryDetailIds:', defaultBody.categoryDetailIds);
  }
};

const setApiDate = async (startDate, endDate) => {
  selectStartDate = startDate;
  selectEndDate = endDate;

  defaultBody.startDate = selectStartDate;
  defaultBody.endDate = selectEndDate;
};

const setApiForm = async (title, content) => {
  selectTitle = title;
  selectContent = content;

  defaultBody.title = selectTitle;
  defaultBody.content = selectContent;

  try {
    const response = await GrowRoomWriteApi.postWrite(defaultBody);
    console.log('서버 응답:', response);

    console.log('메뉴 닫기');
  } catch (error) {
    console.error('서버에 선택된 값을 보내는 중 오류가 발생했습니다:', error);
  }

  // 서버에 데이터를 전송한 후 defaultBody 초기화
  defaultBody = {
    recruitmentId: 1,
    numberId: 1,
    periodId: 1,
    startDate: 1,
    endDate: 1,
    categoryDetailIds: [],
    title: "GrowRoom 제목",
    content: "GrowRoom 내용"
  };
};

export { defaultBody, setApiData, setApiDate, setApiForm };
