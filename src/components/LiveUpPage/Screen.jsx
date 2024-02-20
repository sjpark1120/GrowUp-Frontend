import React, { useEffect, useRef, useState } from "react";
import kurentoUtils from "kurento-utils";

const Screen = () => {
  const [webSocket, setWebSocket] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  let webRtcPeer = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://dev.jojoumc.shop/call`);
    ws.onopen = () => {
      console.log("WebSocket connection opened");
      setWebSocket(ws);
    };

    ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
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
    const message = {
      id: "onIceCandidate",
      candidate: candidate,
      roomId: "1",
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
                  roomId: "1",
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
            roomId: "1",
          });
        });
      }
    );
  };

  const sendMessage = (message) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message);
      console.log("Sending message:", jsonMessage);
      webSocket.send(jsonMessage);
    }
  };

  const stop = () => {
    sendMessage({
      id: "stop",
      roomId: "1",
    });
    dispose();
  };

  const dispose = () => {
    if (webRtcPeer.current) {
      webRtcPeer.current.dispose();
      webRtcPeer.current = null;
    }
  };
  return (
    <div style={{ paddingTop: "3rem" }}>
      <h1>Video Conference</h1>
      <video ref={localVideoRef} autoPlay style={{ width: "30%" }}></video>
      <video ref={remoteVideoRef} autoPlay style={{ width: "30%" }}></video>
      <div>
        <button onClick={startPresentation}>Start Presentation</button>
        <button onClick={startViewing}>Start Viewing</button>
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
};

export default Screen;
// const Screen = () => {
//   const [webSocket, setWebSocket] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   let webRtcPeer = useRef(null);

//   useEffect(() => {
//     const ws = new WebSocket(`wss://dev.jojoumc.shop/call`);
//     ws.onopen = () => {
//       console.log("WebSocket connection opened");
//       setWebSocket(ws);
//     };

//     ws.onmessage = (message) => {
//       const parsedMessage = JSON.parse(message.data);
//       console.info("Received message:", parsedMessage);
//       switch (parsedMessage.id) {
//         case "presenterResponse":
//           console.log("presenterResponse");
//           presenterResponse(parsedMessage);
//           break;
//         case "viewerResponse":
//           console.log("viewerResponse");
//           viewerResponse(parsedMessage);
//           break;
//         case "iceCandidate":
//           console.log("iceCandidate");
//           if (webRtcPeer.current) {
//             webRtcPeer.current.addIceCandidate(parsedMessage.candidate);
//           }
//           break;
//         case "stopCommunication":
//           console.log("stopCommunication");
//           dispose();
//           break;
//         default:
//           console.error("Unrecognized message:", parsedMessage);
//       }
//     };

//     return () => ws.close();
//   }, []);

//   const presenterResponse = (message) => {
//     if (message.response !== "accepted") {
//       console.error("Call not accepted:", message.message);
//       dispose();
//     } else {
//       webRtcPeer.current.processAnswer(message.sdpAnswer);
//     }
//   };

//   const viewerResponse = (message) => {
//     if (message.response !== "accepted") {
//       console.error("Call not accepted:", message.message);
//       dispose();
//     } else {
//       webRtcPeer.current.processAnswer(message.sdpAnswer);
//     }
//   };

//   const onIceCandidate = (candidate) => {
//     const message = {
//       id: "onIceCandidate",
//       candidate: candidate,
//       roomId: "1",
//     };
//     sendMessage(message);
//   };

//   const startPresentation = () => {
//     if (navigator.mediaDevices.getDisplayMedia) {
//       navigator.mediaDevices
//         .getDisplayMedia({ video: true }) // 화면 공유 요청
//         .then((stream) => {
//           // 화면 공유 스트림을 처리하는 로직
//           const options = {
//             localVideo: localVideoRef.current,
//             onicecandidate: onIceCandidate,
//             configuration: {
//               iceServers: [
//                 { urls: "stun:3.37.25.119:3478" },
//                 {
//                   urls: "turn:3.37.25.119:3478",
//                   username: "admin",
//                   credential: "pass",
//                 },
//               ],
//             },
//             videoStream: stream,
//           };
//           webRtcPeer.current = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
//             options,
//             function (error) {
//               if (error) return console.error(error);
//               this.generateOffer((err, offerSdp) => {
//                 if (err) return console.error(err);
//                 sendMessage({
//                   id: "presenter",
//                   sdpOffer: offerSdp,
//                   roomId: "1",
//                 });
//               });
//             }
//           );
//         })
//         .catch((error) => {
//           console.error("Error accessing display media.", error);
//         });
//     } else {
//       console.log("getDisplayMedia is not supported");
//     }
//   };

//   const startViewing = () => {
//     const options = {
//       remoteVideo: remoteVideoRef.current,
//       onicecandidate: onIceCandidate,
//       configuration: {
//         iceServers: [
//           { urls: "stun:3.37.25.119:3478" },
//           {
//             urls: "turn:3.37.25.119:3478",
//             username: "admin",
//             credential: "pass",
//           },
//         ],
//       },
//     };
//     webRtcPeer.current = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
//       options,
//       function (error) {
//         if (error) return console.error(error);
//         this.generateOffer((err, offerSdp) => {
//           if (err) return console.error(err);
//           sendMessage({
//             id: "viewer",
//             sdpOffer: offerSdp,
//             roomId: "1",
//           });
//         });
//       }
//     );
//   };

//   const sendMessage = (message) => {
//     if (webSocket && webSocket.readyState === WebSocket.OPEN) {
//       const jsonMessage = JSON.stringify(message);
//       console.log("Sending message:", jsonMessage);
//       webSocket.send(jsonMessage);
//     }
//   };

//   const stop = () => {
//     sendMessage({
//       id: "stop",
//       roomId: "1",
//     });
//     dispose();
//   };

//   const dispose = () => {
//     if (webRtcPeer.current) {
//       webRtcPeer.current.dispose();
//       webRtcPeer.current = null;
//     }
//   };

//   return (
//     <div style={{ paddingTop: "3rem" }}>
//       <h1>Video Conference</h1>
//       <video ref={localVideoRef} autoPlay style={{ width: "30%" }}></video>
//       <video ref={remoteVideoRef} autoPlay style={{ width: "30%" }}></video>
//       <div>
//         <button onClick={startPresentation}>Start Presentation</button>
//         <button onClick={startViewing}>Start Viewing</button>
//         <button onClick={stop}>Stop</button>
//       </div>
//     </div>
//   );
// };

// export default Screen;

//HTTPS=true SSL_CRT_FILE=/Users/kimminchan/localhost.pem SSL_KEY_FILE=/Users/kimminchan/localhost-key.pem HOST=192.168.200.178
