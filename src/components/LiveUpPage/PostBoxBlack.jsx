import styled from 'styled-components';

import tag_close from '../../icon/모집완료.png';
import tag_open from '../../icon/모집중.png';
import tag_popular from '../../icon/인기.png';
import tag_study from '../../icon/스터디.png';
import img_like from '../../icon/img-like.svg';
import img_unlike from '../../icon/img-unlike.svg';

const Box = styled.div`
  display: flex;
  width: 292px;
  height: 254px;
  padding-left: 26px;
  padding-right: 26px;
  padding-top: 24px;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #E2E2E2;
`;

const MainText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #ffffff;
  font-size: 16px;
  height: 44px;
  font-weight: 500;
  line-height: 140%;
`;

const DeadLine = styled.div`
padding-bottom:8px;
color: #999999;
font-size: 12px;
font-weight: 400;
`

const Views = styled.div`
color: #848484; 
font-size: 12px; 
font-weight: 400
`
const PostBoxBlack = ({ popular, study, status, deadline, maintext, views, like}) => {

    const getStatus = () => {
        switch (status) {
          case 'open':
            return tag_open;
          case 'close':
            return tag_close;
          default: 
            return '';
        }
      };

      const isLiked = () => {
        switch (like) {
          case 'like':
            return img_like;
          case 'unlike':
            return img_unlike;
          default:
            return '';
        }
      };

    const formattedViews = views >= 1000 ? '999+' : views;

    return (
        <Box style={{ opacity: status === 'close' ? 0.5 : 1 }}>
        <div style={{ paddingBottom: '28px' }}>

                <div style={{ justifyContent: 'flex-start', gap: '10px', display: 'flex', paddingBottom: '20px' }}>
                    {popular && <img src={tag_popular} alt="popular" />}
                    {study && <img src={tag_study} alt="study" />}
                    <img src={getStatus()} alt="Recruit Status" style={{ marginLeft: 'auto' }} />
                </div>

                <DeadLine>{`마감일 | ${deadline}`}</DeadLine>

                <MainText>{`${maintext}`}</MainText>

            </div>

            <div style={{ borderTop: '1px #E6E6E6 solid', marginTop: 'auto', padding: '12px 0px 14px 0px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', alignSelf: 'stretch' }}>
                <Views>{`조회수 ${formattedViews}회`}</Views>
                <img src={isLiked()} alt="Like"/>
            </div>
            
        </Box>

    );
};

export default PostBoxBlack;
