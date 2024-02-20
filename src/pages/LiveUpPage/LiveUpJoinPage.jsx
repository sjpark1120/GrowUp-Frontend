import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import button_1 from "../../icon/Page button_c1.png";
import timer from "../../icon/timer.png";
import share from "../../icon/screen_share_false.png";
import video from "../../icon/video_share.png";
import screen_img from "../../icon/image 39.png";
import screen_img_true from "../../icon/screen_share-1.png";
import timer_true from "../../icon/screen_share.png";
import video_true from "../../icon/video_share_true.png";
import OverlayBox from "../../components/LiveUpPage/OverlayBox";
import kurentoUtils from "kurento-utils";
import { client } from "../../apis/mypageEdit";
import LiveUpParticipantList from "../../components/LiveUpPage/LiveUpParticipantList";

const LiveUpJoinPageBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1c1c1c;
  padding-top: 122px;
`;

const ScreenBlock = styled.div`
  width: 1220px;
  height: 858px;
  margin-top: 80px;
  line-height: 35px;
`;

const ScreenHeader = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  padding-bottom: 47px;
  cursor: pointer;
  text-decoration: none;
  .title {
    font-size: 25px;
    font-weight: 800;
  }
`;

const StyledImage = styled.img`
  width: 35px;
  height: 35px;
`;

const Screen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 701px;
  border: 1px solid #00d749;
  color: #fff;
  font-size: 25px;
  font-weight: 800;
  .screen_img {
    width: 100%;
    height: 100%;
  }
  video {
    width: 100%;
    height: 100%;
  }
`;

const Playbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3a3a3a;
  height: 75px;
  /* font-size: 2rem; */
  /* font-weight: bold; */
  color: #b0b0b0;
  padding: 10px 50px 10px 50px;

  .time {
    width: 493px;
    font-size: 46px;
    font-weight: 600;
    line-height: 50.6px;
    margin-top: 10px;
  }
  .icons {
    display: flex;
    justify-content: end;
    width: 493px;
    img {
      margin: 0 15px;
      cursor: pointer;
    }
  }
`;

const ParticipantsBlock = styled.div`
  margin-top: 180px;
  width: 1220px;
  height: 1719px;
  .title {
    display: flex;
    width: 567px;
    .subtitle {
      font-size: 25px;
      font-weight: 800;
      padding-right: 30px;
      color: #fff;
    }
    .btn {
      display: flex;
      width: 373px;
      li {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 20px;
        padding-right: 30px;
      }
      li:last-child {
        padding-right: 0;
      }
    }
  }
`;

const CardBlock = styled.div`
  width: 1216px;
  height: 1460px;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
`;

const PageNationBar = styled.div`
  width: 1220px;
  display: flex;
  justify-content: center;
  align-items: center;
  .page {
    width: 284px;
    display: flex;
    justify-content: center;
    align-items: center;
    .pagenationBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 30px;
      font-size: 16px;
      width: 24px;
      height: 24px;
      color: #fff;
      border-radius: 30px;
      /* padding-top: 3px; */
      padding: 10px;
    }
    .pagenatinoBtn:last-child {
      margin-right: 0;
    }
    .arrow_left {
      margin: 0 30px;
    }
    .arrow_right {
      margin-right: 30px;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  .videoModal {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 400px;
    height: 250px;
    border-radius: 8px;
    .title {
      position: absolute;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #b0b0b0;
      width: 400px;
      height: 36px;
      padding: 6px 14px;
      .logo {
        width: 78px;
        height: 12px;
      }
      .cancel {
        cursor: pointer;
      }
    }
    .content {
      width: 400px;
      height: 214px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 36px;
      .content_title {
        font-size: 25px;
        font-weight: 800;
        line-height: 35px;
      }
      .rule {
        font-size: 12px;
        font-weight: 600;
        color: #b0b0b0;
        padding-bottom: 20px;
      }
      .start_btn {
        width: 92px;
        height: 42px;
        padding: 16px 6px;
        border: 1px solid #b0b0b0;
        border-radius: 8px;
        margin-top: 16px;
        line-height: 10px;
        color: #fff;
        background-color: #b0b0b0;
        cursor: pointer;
        &:hover {
          background-color: #00d749;
          border: 1px solid #00d749;
          color: #fff;
        }
      }
    }
  }

  .withdrawModal {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 657px;
    height: 460px;
    border-radius: 8px;
    .title {
      width: 657px;
      height: 36px;
      position: absolute;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #b0b0b0;
      padding: 6px 14px;
      .logo {
        width: 78px;
        height: 12px;
      }
      .cancel {
        cursor: pointer;
      }
    }
    .content {
      width: 427px;
      height: 319px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .content_title {
        font-size: 25px;
        font-weight: 800;
        line-height: 35px;
      }
      .line {
        padding-top: 20px;
        width: 100%;
        position: relative;
        text-align: center;
        &::before {
          content: "";
          display: block;
          width: 40%;
          height: 1px;
          background-color: #000; /* 선의 색상 설정 */
          position: absolute; /* 절대 위치 설정 */
          left: 0; /* 왼쪽에서 시작 */
          top: 75%; /* 상단에서부터 요소의 50% 위치에 설정 */
          transform: translateY(-50%); /* 선을 수직 중앙으로 정렬 */
        }
        &::after {
          content: "";
          display: block;
          width: 40%;
          height: 1px;
          background-color: #000; /* 선의 색상 설정 */
          position: absolute; /* 절대 위치 설정 */
          right: 0; /* 왼쪽에서 시작 */
          top: 75%; /* 상단에서부터 요소의 50% 위치에 설정 */
          transform: translateY(-50%); /* 선을 수직 중앙으로 정렬 */
        }
      }
      .notice {
        padding: 20px 0;
        font-size: 12px;
        line-height: 19.2px;
        color: #4f4f4f;
        .red {
          color: #ff4747;
          padding-bottom: 10px;
        }
      }
      .rule {
        font-size: 12px;
        font-weight: 600;
        color: #b0b0b0;
        padding-bottom: 20px;
      }
      .withdrawBox {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;

        .start_btn {
          width: 77px;
          height: 40px;
          padding: 16px 6px;
          border: 1px solid #b0b0b0;
          border-radius: 8px;
          line-height: 10px;
          color: #fff;
          background-color: #b0b0b0;
          cursor: pointer;
          &:hover {
            background-color: #00d749;
            border: 1px solid #00d749;
            color: #fff;
          }
        }
      }
    }
  }

  .modal {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 880px;
    height: 733px;
    border-radius: 8px;
    .title {
      position: absolute;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #b0b0b0;
      width: 880px;
      height: 36px;
      padding: 6px 14px;
      .logo {
        width: 78px;
        height: 12px;
      }
      .cancel {
        cursor: pointer;
      }
    }
    .content {
      width: 880px;
      height: 647px;
      padding: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .content_title {
        font-size: 25px;
        font-weight: 800;
        padding-bottom: 40px;
      }
      .screenBlock {
        width: 781px;
        height: 440px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        .screen {
          width: 247px;
          height: 205px;
          border: 1px solid #b0b0b0;
          border-radius: 8px;
          padding: 20px;
          cursor: pointer;
          img {
            width: 206px;
            height: 135px;
          }
          .screen_name {
            width: 207px;
            font-size: 14px;
            line-height: 19.6px;
            color: #090909;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-top: 10px;
          }
        }
      }
      .start_btn {
        width: 92px;
        height: 42px;
        padding: 16px 6px;
        border: 1px solid #b0b0b0;
        border-radius: 8px;
        margin-top: 38px;
        line-height: 10px;
        color: #fff;
        background-color: #b0b0b0;
        cursor: pointer;
        &:hover {
          background-color: #00d749;
          border: 1px solid #00d749;
          color: #fff;
        }
      }
    }
  }
`;

function LiveUpJoinPage() {
  const [videoToggle, setVideoToggle] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [videoShare, setVideoShare] = useState(false);
  const [timerToggle, setTimerToggle] = useState(false);
  const [time, setTime] = useState(0); // 초 단위로 시간을 관리

  useEffect(() => {
    let interval;
    if (timerToggle) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!timerToggle && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time, timerToggle]);

  useEffect(() => {
    client
      .get(`/growup/participate/madeBy?growRoomId=${param.roomid}`)
      .then((res) => {
        if (res.data.result.userId === Number(localStorage.getItem("userId")))
          setIsOwner(true);
      })
      .catch((e) => {
        console.log(e, "error");
      });
    client
      .patch(`/growup/participate/enter?growRoomId=${param.roomid}`)
      .then((res) => {
        console.log(res, "enter");
      })
      .catch((e) => {
        console.log(e, "error");
      });
  }, []);

  const out = () => {
    client
      .patch(`/growup/participate/out?growRoomId=${param.roomid}`)
      .then((res) => {
        console.log(res, "enter");
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  const enterHead = () => {
    console.log("enterHead");
    client
      .post(`/growup/participate/enter-Head?growRoomId=${param.roomid}`)
      .then((res) => {
        console.log(res, "head");
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };

  // 화면 공유
  const param = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [webSocket, setWebSocket] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  let webRtcPeer = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://test-ubuntudb.shop/call `);
    ws.onopen = () => {
      console.log("WebSocket connection opened");
      setWebSocket(ws);
    };

    ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      console.log(message, "message");
      console.info("Received message:", parsedMessage);
      switch (parsedMessage.id) {
        case "presenterResponse":
          console.log("presenterResponse");
          presenterResponse(parsedMessage);
          break;
        case "viewerResponse":
          console.log("viewerResponse");
          viewerResponse(parsedMessage);
          break;
        case "iceCandidate":
          console.log("iceCandidate");
          if (webRtcPeer.current) {
            webRtcPeer.current.addIceCandidate(parsedMessage.candidate);
          }
          break;
        case "stopCommunication":
          console.log("stopCommunication");
          dispose();
          break;
        default:
          console.error("Unrecognized message:", parsedMessage);
      }
    };

    return () => ws.close();
  }, []);

  const presenterResponse = (message) => {
    if (message.response !== "accepted") {
      console.error("Call not accepted:", message.message);
      dispose();
    } else {
      webRtcPeer.current.processAnswer(message.sdpAnswer);
    }
  };

  const viewerResponse = (message) => {
    if (message.response !== "accepted") {
      console.error("Call not accepted:", message.message);
      dispose();
    } else {
      webRtcPeer.current.processAnswer(message.sdpAnswer);
    }
  };

  const onIceCandidate = (candidate) => {
    console.log("onIce", candidate);
    const message = {
      id: "onIceCandidate",
      candidate: candidate,
      roomId: param.roomid,
    };
    sendMessage(message);
  };

  const startPresentation = () => {
    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getDisplayMedia({ video: true }) // 화면 공유 요청
        .then((stream) => {
          // 화면 공유 스트림을 처리하는 로직
          const options = {
            localVideo: localVideoRef.current,
            onicecandidate: onIceCandidate,
            configuration: {
              iceServers: [
                { urls: "stun:3.37.25.119:3478" },
                {
                  urls: "turn:3.37.25.119:3478",
                  username: "admin",
                  credential: "pass",
                },
              ],
            },
            videoStream: stream,
          };
          webRtcPeer.current = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
            options,
            function (error) {
              if (error) return console.error(error);
              this.generateOffer((err, offerSdp) => {
                if (err) return console.error(err);
                sendMessage({
                  id: "presenter",
                  sdpOffer: offerSdp,
                  roomId: param.roomid,
                });
              });
            }
          );
        })
        .catch((error) => {
          console.error("Error accessing display media.", error);
        });
    } else {
      console.log("getDisplayMedia is not supported");
    }
  };

  const startViewing = () => {
    const options = {
      remoteVideo: remoteVideoRef.current,
      onicecandidate: onIceCandidate,
      configuration: {
        iceServers: [
          { urls: "stun:3.37.25.119:3478" },
          {
            urls: "turn:3.37.25.119:3478",
            username: "admin",
            credential: "pass",
          },
        ],
      },
    };
    webRtcPeer.current = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
      options,
      function (error) {
        if (error) return console.error(error);
        this.generateOffer((err, offerSdp) => {
          if (err) return console.error(err);
          sendMessage({
            id: "viewer",
            sdpOffer: offerSdp,
            roomId: param.roomid,
          });
        });
      }
    );
  };
  const startVidoePresentation = () => {
    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // 화면 공유 스트림을 처리하는 로직
          const options = {
            localVideo: localVideoRef.current,
            onicecandidate: onIceCandidate,
            configuration: {
              iceServers: [
                { urls: "stun:3.37.25.119:3478" },
                {
                  urls: "turn:3.37.25.119:3478",
                  username: "admin",
                  credential: "pass",
                },
              ],
            },
            mediaStream: stream,
          };
          webRtcPeer.current = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
            options,
            function (error) {
              if (error) return console.error(error);
              this.generateOffer((err, offerSdp) => {
                if (err) return console.error(err);
                sendMessage({
                  id: "presenter",
                  sdpOffer: offerSdp,
                  roomId: param.roomid,
                });
              });
            }
          );
        })
        .catch((error) => {
          console.error("Error accessing display media.", error);
        });
    } else {
      console.log("getDisplayMedia is not supported");
    }
  };

  const sendMessage = (message) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message);
      console.log("Sending message:ㄴㅇㄹ", jsonMessage);
      webSocket.send(jsonMessage);
    }
  };

  const stop = () => {
    if (webRtcPeer.current && webRtcPeer.current.stream) {
      webRtcPeer.current.stream.getTracks().forEach((track) => track.stop());
    }

    sendMessage({
      id: "stop",
      roomId: param.roomid,
    });
    dispose();
  };

  const dispose = () => {
    if (webRtcPeer.current) {
      webRtcPeer.current.dispose();
      webRtcPeer.current = null;
      console.log(webRtcPeer, "webRtcPeer");
    }
  };

  useEffect(() => {
    if (screenShare === true && isOwner === false) {
      startViewing();
    }
    if (videoShare === true && isOwner === true) {
      console.log(videoShare, isOwner, "sadfds");
      startVidoePresentation();
    }
  }, [screenShare, isOwner, videoShare]);
  return (
    <LiveUpJoinPageBlock>
      <OverlayBox
        toggle={videoToggle}
        setToggle={setVideoToggle}
        setShare={setVideoShare}
        title={"비디오 공유를 시작 할까요?"}
        subTitle={"공유 시작"}
      />
      <ScreenBlock>
        <ScreenHeader
          to={"/liveup"}
          onClick={() => {
            stop(param.roomid);
            if (!isOwner) out();
          }}
        >
          <StyledImage src={button_1} alt="button_1" />
          <div className="title">LIVE UP 종료</div>
        </ScreenHeader>
        <Screen>
          {isOwner ? (
            (screenShare && !videoShare) || (!screenShare && videoShare) ? (
              <video ref={localVideoRef} autoPlay></video>
            ) : (
              <div>LIVE UP을 시작해주세요!</div>
            )
          ) : screenShare ? (
            <video ref={remoteVideoRef} autoPlay></video>
          ) : (
            <div>LIVE UP을 참가하시겠습니까?!</div>
          )}
        </Screen>
        <Playbar>
          {isOwner ? (
            <>
              <div
                className="time"
                style={{ color: timerToggle ? "#00D749" : "" }}
              >{`${Math.floor(time / 3600)
                .toString()
                .padStart(2, "0")} : ${Math.floor((time % 3600) / 60)
                .toString()
                .padStart(2, "0")} : ${(time % 60)
                .toString()
                .padStart(2, "0")}`}</div>
              <div className="icons">
                <img
                  src={timerToggle ? timer_true : timer}
                  onClick={() => {
                    enterHead();
                    setTimerToggle(!timerToggle);
                  }}
                  alt="timer"
                />
                <img
                  src={screenShare ? screen_img_true : share}
                  onClick={() => {
                    if (videoShare) return;
                    if (screenShare) {
                      setScreenShare(false);
                      stop();
                    } else {
                      setScreenShare(true);
                      startPresentation();
                    }
                  }}
                  alt="share"
                />
                <img
                  src={videoShare ? video_true : video}
                  onClick={() => {
                    if (screenShare) return;
                    if (videoShare) {
                      stop();
                      setVideoShare(false);
                    } else {
                      setVideoToggle(true);
                      console.log(videoToggle, "videoToggle");
                    }
                  }}
                  alt="video"
                />
              </div>
            </>
          ) : (
            <>
              <div className="time"></div>
              <div className="icons">
                <img
                  src={screenShare ? screen_img_true : share}
                  onClick={() => {
                    if (videoShare) return;
                    if (screenShare) {
                      setScreenShare(false);
                      stop();
                    } else {
                      setScreenShare(true);
                    }
                  }}
                  alt="share"
                />
              </div>
            </>
          )}
        </Playbar>
      </ScreenBlock>
      <ParticipantsBlock>
        <LiveUpParticipantList />
      </ParticipantsBlock>
    </LiveUpJoinPageBlock>
  );
}

export default LiveUpJoinPage;
