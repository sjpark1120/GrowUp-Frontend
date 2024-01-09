import styled from 'styled-components';
const Box = styled.div`
display: flex;
width: 292px;
padding-left: 26px;
padding-right: 26px;
align-items: center;
padding-top: 24px;
flex-direction: column;
border-radius: 16px;
border: 1px solid #E2E2E2;
background: #FFF;`

const Category = styled.div`
color: #797979;
fontSize: 12;
textTransform: uppercase;
`

const PostBox = () => {
  return (
    <Box>
        <div style={{borderBottom: '1px #E6E6E6 solid',paddingBottom:'28px'}}>
            <div style={{justifyContent: 'flex-start', gap: '10px', display: 'inline-flex', paddingBottom:'20px'}}>
                <Button/><Button/>
            </div>
            <div style={{paddingBottom:'8px', color: '#999999', fontSize: 12, fontFamily: 'Pretendard', fontWeight: '400'}}>마감일 | 2023.12.05</div>
            <div style={{paddingBottom:'12px', color: '#1C1C1C', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '500', wordWrap: 'break-word'}}>'이제 막' 공부 시작한 디자이너와 프론트엔드 개발자를 구합니다! 어서 오세요요용</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px'}}>
                <Category># 카테고리1</Category>
                <Category># 카테고리2</Category>
                
            </div>
        </div>
        <div style={{padding: '12px 0px 14px 0px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', alignSelf: 'stretch'}}>
            <div style={{color: '#848484', fontSize: 12, fontWeight: '400'}}>조회수 999+회</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M15.0003 26.2512L14.473 25.8997C11.9663 24.2256 8.79466 22.3336 6.44564 19.5528C3.97005 16.6231 2.78236 13.6143 2.81283 10.3536C2.84974 6.71255 5.76947 3.75122 9.32142 3.75122C12.1404 3.75122 14.0148 5.39185 15.0003 6.57603C15.9859 5.39185 17.8603 3.75122 20.6792 3.75122C24.2312 3.75122 27.1509 6.71255 27.1878 10.3518C27.2206 13.6143 26.033 16.6213 23.555 19.551C21.206 22.3336 18.0343 24.2256 15.5277 25.8997L15.0003 26.2512Z" fill="#E6E6E6"/>
            </svg>
        </div>
    </Box>

  );
};


//어떻게할지물어보기........
const Button = () => {
    return (
      <div
        style={{
          padding: '4px 10px 4px 8px',
          background: '#EFECFF',
          borderRadius: '100px',
          gap: '10px',
          display: 'flex',
        }}>
          <text
            style={{
              color: '#00812C',
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '19.60px',
            }}>
                인기
            </text>
      </div>
    );
  };
  
export default PostBox;
