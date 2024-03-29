
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLike } from '../../redux/LikeContext';

import tag_close from '../../icon/모집완료.png';
import tag_popular from '../../icon/인기.png';
import tag_study from '../../icon/스터디.png';
import tag_project from '../../icon/프로젝트.png';
import tag_challenge from '../../icon/챌린지.png';
import img_like from '../../icon/img-like.svg';
import img_unlike from '../../icon/img-unlike.svg';

const Box = styled.div`
  display: flex;
  width: 292px;
  padding-left: 26px;
  padding-right: 26px;
  padding-top: 24px;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #f7f7f7;
  background: #fff;
`;

const Title = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #1c1c1c;
  font-size: 16px;
  font-weight: 500;
  line-height: 22.4px;
`;

const DeadLine = styled.p`
  padding-bottom: 8px;
  color: #999999;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;
`;

const Views = styled.p`
  color: #848484;
  font-size: 12px;
  font-weight: 400;
`;

const PostBox = ({ growRoomId, popular, recruitment_field, status, deadline, title, view, like }) => {
  const { updateLikeStatus, likes } = useLike();
  const isActive = likes[growRoomId] ?? like; // growRoomId에 해당하는 좋아요 데이터가 없을 경우 기존 like 사용

  useEffect(() => {
  }, [isActive, updateLikeStatus]);

  const handleLikeClick = async (event) => {
    event.stopPropagation();

    try {
      // 서버로 좋아요 토글 요청
      const updatedState = await updateLikeStatus(growRoomId);

      // 새로운 상태로 업데이트
      console.log('Updated State:', updatedState);
    } catch (error) {
      console.error("좋아요 토글 중 오류 발생:", error);
    }
  };
  const isLiked = () => {
    return isActive ? img_like : img_unlike;
  };

  const getRecruitmentTag = (recruitment_field) => {
    switch (recruitment_field) {
      case "스터디":
        return <img src={tag_study} alt="study" />;
      case "프로젝트":
        return <img src={tag_project} alt="project" />;
      case "챌린지":
        return <img src={tag_challenge} alt="challenge" />;
      default:
        return null;
    }
  };

  const formattedViews = view >= 1000 ? "999+" : view;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/growroom/${growRoomId}`, { state: { growRoomId } });
  };

  return (
    <Box style={{ opacity: status === "모집마감" ? 0.5 : 1 , pointerEvents: status === '모집마감' ? 'none' : 'auto' }} onClick={handleClick}>
      <div style={{ paddingBottom: "28px" }}>
        <div
          style={{
            justifyContent: "flex-start",
            gap: "10px",
            display: "flex",
            paddingBottom: "20px",
          }}
        >
          {popular && <img src={tag_popular} alt="popular" />}

          {getRecruitmentTag(recruitment_field)}

          {status === "삭제" && (
            <img
              src={tag_close}
              alt="Recruit Status"
              style={{ marginLeft: "auto" }}
            />
          )}
        </div>

        <DeadLine>{`마감일 | ${deadline}`}</DeadLine>

        <Title>{`${title}`}</Title>
      </div>
      <div
        style={{
          borderTop: "1px #F7F7F7 solid",
          marginTop: "auto",
          padding: "12px 0px 14px 0px",
          justifyContent: "space-between",
          alignItems: "center",
          display: "inline-flex",
          alignSelf: "stretch",
        }}
      >
        <Views>{`조회수 ${formattedViews}회`}</Views>
        <img
          onClick={handleLikeClick}
          src={isLiked()}
          alt="Like"
          style={{ cursor: "pointer" }}
        />
      </div>
    </Box>
  );
};

export default PostBox;
