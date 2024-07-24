
// // import React, { useState, useRef, useEffect } from 'react';
// // import io from 'socket.io-client';
// // const socket = io('http://localhost:3000');

// // export default function VideoChat() {
// //     const [remoteId, setRemoteId] = useState('');
// //     const [localStream, setLocalStream] = useState(null);
// //     const [remoteStream, setRemoteStream] = useState(null);
// //     const localVideoRef = useRef(null);
// //     const remoteVideoRef = useRef(null);
// //     const peerConnection = useRef(null);
  
// //     const peerConnectionConfig = {
// //       iceServers: [
// //         { urls: 'stun:stun.l.google.com:19302' },
// //       ],
// //     };
  
// //     useEffect(() => {
       
// //             socket.on('your-id', id => {
// //               console.log('Your ID:', id);
// //               alert(`Your ID is: ${id}`);
// //             });

// //       socket.on('offer', handleReceiveOffer);
// //       socket.on('answer', handleReceiveAnswer);
// //       socket.on('ice-candidate', handleNewICECandidateMsg);
  
// //       return () => {
// //         socket.off('offer', handleReceiveOffer);
// //         socket.off('answer', handleReceiveAnswer);
// //         socket.off('ice-candidate', handleNewICECandidateMsg);
// //       };
// //     }, []);
  
// //     const startCall = async () => {
// //       peerConnection.current = new RTCPeerConnection(peerConnectionConfig);
  
// //       peerConnection.current.onicecandidate = handleICECandidateEvent;
// //       peerConnection.current.ontrack = handleTrackEvent;
  
// //       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// //       setLocalStream(stream);
// //       localVideoRef.current.srcObject = stream;
  
// //       stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));
  
// //       const offer = await peerConnection.current.createOffer();
// //       await peerConnection.current.setLocalDescription(offer);
  
// //       socket.emit('offer', { sdp: offer, target: remoteId, caller: socket.id });
// //     };
  
// //     const handleReceiveOffer = async (data) => {
// //       peerConnection.current = new RTCPeerConnection(peerConnectionConfig);
  
// //       peerConnection.current.onicecandidate = handleICECandidateEvent;
// //       peerConnection.current.ontrack = handleTrackEvent;
  
// //       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
  
// //       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// //       setLocalStream(stream);
// //       localVideoRef.current.srcObject = stream;
  
// //       stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));
  
// //       const answer = await peerConnection.current.createAnswer();
// //       await peerConnection.current.setLocalDescription(answer);
  
// //       socket.emit('answer', { sdp: answer, target: data.caller });
// //     };
  
// //     const handleReceiveAnswer = async (data) => {
// //       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
// //     };
  
// //     const handleNewICECandidateMsg = async (data) => {
// //       const candidate = new RTCIceCandidate(data.candidate);
// //       await peerConnection.current.addIceCandidate(candidate);
// //     };
  
// //     const handleICECandidateEvent = (event) => {
// //       if (event.candidate) {
// //         socket.emit('ice-candidate', { candidate: event.candidate, target: remoteId });
// //       }
// //     };
  
// //     const handleTrackEvent = (event) => {
// //       setRemoteStream(event.streams[0]);
// //       remoteVideoRef.current.srcObject = event.streams[0];
// //     };
  
// //     return (
// //         <div className="App">
// //           <h1>Video Chat</h1>
// //           <div className="video-container">
// //             <video ref={localVideoRef} autoPlay muted className="local-video"></video>
// //             <video ref={remoteVideoRef} autoPlay className="remote-video"></video>
// //           </div>
// //           <div>
// //             <input
// //               type="text"
// //               placeholder="Enter Remote ID"
// //               value={remoteId}
// //               onChange={(e) => setRemoteId(e.target.value)}
// //             />
// //             <button className="btns" onClick={startCall}>Start Call</button>
// //           </div>
// //         </div>
// //       );
// // }
// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import io from 'socket.io-client';
// const socket = io('http://localhost:3000');

// export default function VideoChat() {
//     const location = useLocation();
//     const userId = location.state?.id || '';
//     const [remoteId, setRemoteId] = useState('');
//     const [localStream, setLocalStream] = useState(null);
//     const [remoteStream, setRemoteStream] = useState(null);
//     const [isVideoMuted, setIsVideoMuted] = useState(false);
//     const [isAudioMuted, setIsAudioMuted] = useState(false);
//     const [incomingCall, setIncomingCall] = useState(null);
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const peerConnection = useRef(null);
  
//     const peerConnectionConfig = {
//       iceServers: [
//         { urls: 'stun:stun.l.google.com:19302' },
//       ],
//     };
  
//     useEffect(() => {
//       socket.on('your-id', id => {
//         console.log('Your ID:', id);
//         alert(`Your ID is: ${id}`);
//       });
     
//       socket.emit('incomingCall', { callerId: socket.id, receiverId: userId });
//       socket.on('offer', handleReceiveOffer);
//       socket.on('answer', handleReceiveAnswer);
//       socket.on('ice-candidate', handleNewICECandidateMsg);
  
//       return () => {
//         socket.off('offer', handleReceiveOffer);
//         socket.off('answer', handleReceiveAnswer);
//         socket.off('ice-candidate', handleNewICECandidateMsg);
//       };
//     }, []);

//     useEffect(() => {
//         socket.on('callNotification', ({ callerId, message }) => {
//           alert(`${message} frommmmmmmmmmmmm ${callerId}`);
//           setRemoteId(callerId) 
//         });
      
// },[])
//     const startCall = async () => {
//       peerConnection.current = new RTCPeerConnection(peerConnectionConfig);
  
//       peerConnection.current.onicecandidate = handleICECandidateEvent;
//       peerConnection.current.ontrack = handleTrackEvent;
  
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setLocalStream(stream);
//       localVideoRef.current.srcObject = stream;
  
//       stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));
  
//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);
  
//       socket.emit('offer', { sdp: offer, target: remoteId, caller: socket.id });
//     };
  
//     const handleReceiveOffer = async (data) => {
//       peerConnection.current = new RTCPeerConnection(peerConnectionConfig);
  
//       peerConnection.current.onicecandidate = handleICECandidateEvent;
//       peerConnection.current.ontrack = handleTrackEvent;
  
//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
  
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setLocalStream(stream);
//       localVideoRef.current.srcObject = stream;
  
//       stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));
  
//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);
  
//       socket.emit('answer', { sdp: answer, target: data.caller });
//     };
  
//     const handleReceiveAnswer = async (data) => {
//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
//     };
  
//     const handleNewICECandidateMsg = async (data) => {
//       const candidate = new RTCIceCandidate(data.candidate);
//       await peerConnection.current.addIceCandidate(candidate);
//     };
  
//     const handleICECandidateEvent = (event) => {
//       if (event.candidate) {
//         socket.emit('ice-candidate', { candidate: event.candidate, target: remoteId });
//       }
//     };
  
//     const handleTrackEvent = (event) => {
//       setRemoteStream(event.streams[0]);
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     // const toggleVideo = () => {
//     //   localStream.getVideoTracks()[0].enabled = !isVideoMuted;
//     //   setIsVideoMuted(!isVideoMuted);
//     // };
//     const toggleVideo = () => {
//         const videoTrack = localStream.getVideoTracks()[0];
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoMuted(!videoTrack.enabled);
//       };
  

//     const toggleAudio = () => {
//       localStream.getAudioTracks()[0].enabled = !isAudioMuted;
//       setIsAudioMuted(!isAudioMuted);
//     };

//     const endCall = () => {
//       peerConnection.current.close();
//       setRemoteStream(null);
//       setLocalStream(null);
//       localVideoRef.current.srcObject = null;
//       remoteVideoRef.current.srcObject = null;
//       setRemoteId('');
//     };

//     const acceptCall = () => {
//         setIncomingCall(null);
//         startCall();
//       };
  
//     const rejectCall = () => {
//         setIncomingCall(null);
//         socket.emit('callRejected', { callerId: remoteId });
//       };

//     return (
//         <div className="App">
//           <h1>Video Chat</h1>
//           <div className="video-container">
//             <video ref={localVideoRef} autoPlay muted className="local-video"></video>
//             <video ref={remoteVideoRef} autoPlay className="remote-video"></video>
//           </div>
//           <div>
//             <input
//               type="text"
//               placeholder="Enter Remote ID"
//               value={remoteId}
//               onChange={(e) => setRemoteId(e.target.value)}
//             />
//             <button className="btns" onClick={startCall}>Start Call</button>

//             <div className="video-chat-button-container">
//             <button className="transparent-btns" onClick={toggleVideo}>
//                         <i className={isVideoMuted ? 'fas fa-video-slash' : 'fas fa-video'}></i>
//                         </button>
//                         <button className="transparent-btns end-call-btn" onClick={endCall}>
//                             <i className= 'fas fa-phone-slash' ></i>
//                         </button>
//                         <button className="transparent-btns" onClick={toggleAudio}>
//                         <i className={isAudioMuted ? 'fa fa-microphone-slash' : 'fa fa-microphone'}></i>
//                         </button>
                    
//             </div>
//          </div>
//          {incomingCall && (
//             <div className="modal">
//               <div className="modal-content">
//                 <h2>Incoming Call</h2>
//                 <p>{incomingCall.message} from {incomingCall.callerId}</p>
//                 <button onClick={acceptCall}>Accept</button>
//                 <button onClick={rejectCall}>Cancel</button>
//               </div>
//             </div>
//           )}
//         </div>
//       );
// }

import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export default function VideoChat() {
    const location = useLocation();
    const userId = location.state?.id || '';
    const [remoteId, setRemoteId] = useState('');
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null); // State for handling incoming calls
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
  
    const peerConnectionConfig = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
      ],
    };
  
    useEffect(() => {
      socket.on('your-id', id => {
        console.log('Your ID:', id);
        // alert(`Your ID is: ${id}`);
      });
     
      socket.emit('incomingCall', { callerId: socket.id, receiverId: userId });
      socket.on('offer', handleReceiveOffer);
      socket.on('answer', handleReceiveAnswer);
      socket.on('ice-candidate', handleNewICECandidateMsg);
  
      return () => {
        socket.off('offer', handleReceiveOffer);
        socket.off('answer', handleReceiveAnswer);
        socket.off('ice-candidate', handleNewICECandidateMsg);
      };
    }, []);

    useEffect(() => {
        socket.on('callNotification', ({ callerId, message }) => {
            console.log('callNotification event received');
          console.log('Incoming call from:', callerId); 
          setIncomingCall({ callerId, message });
          setRemoteId(callerId);
        });
    }, []);

    const startCall = async () => {
      peerConnection.current = new RTCPeerConnection(peerConnectionConfig);
  
      peerConnection.current.onicecandidate = handleICECandidateEvent;
      peerConnection.current.ontrack = handleTrackEvent;
  
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;
  
      stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));
  
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
  
      socket.emit('offer', { sdp: offer, target: remoteId, caller: socket.id });
    };
  
    const handleReceiveOffer = async (data) => {
      peerConnection.current = new RTCPeerConnection(peerConnectionConfig);
  
      peerConnection.current.onicecandidate = handleICECandidateEvent;
      peerConnection.current.ontrack = handleTrackEvent;
  
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
  
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;
  
      stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));
  
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
  
      socket.emit('answer', { sdp: answer, target: data.caller });
    };
  
    const handleReceiveAnswer = async (data) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
    };
  
    const handleNewICECandidateMsg = async (data) => {
      const candidate = new RTCIceCandidate(data.candidate);
      await peerConnection.current.addIceCandidate(candidate);
    };
  
    const handleICECandidateEvent = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { candidate: event.candidate, target: remoteId });
      }
    };
  
    const handleTrackEvent = (event) => {
      setRemoteStream(event.streams[0]);
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const toggleVideo = () => {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoMuted(!videoTrack.enabled);
    };
  
    const toggleAudio = () => {
      localStream.getAudioTracks()[0].enabled = !isAudioMuted;
      setIsAudioMuted(!isAudioMuted);
    };

    const endCall = () => {
      peerConnection.current.close();
      setRemoteStream(null);
      setLocalStream(null);
      localVideoRef.current.srcObject = null;
      remoteVideoRef.current.srcObject = null;
      setRemoteId('');
    };

    const acceptCall = () => {
      setIncomingCall(null);
      startCall();
    };

    const rejectCall = () => {
      setIncomingCall(null);
      socket.emit('callRejected', { callerId: remoteId });
    };
  
    return (
        <div className="App">
          <h1>Video Chat</h1>
          <div className="video-container">
            <video ref={localVideoRef} autoPlay muted className="local-video"></video>
            <video ref={remoteVideoRef} autoPlay className="remote-video"></video>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Remote ID"
              value={remoteId}
              onChange={(e) => setRemoteId(e.target.value)}
            />
            <button className="btns" onClick={startCall}>Start Call</button>
            <div className="video-chat-button-container">
              <button className="transparent-btns" onClick={toggleVideo}>
                <i className={isVideoMuted ? 'fas fa-video-slash' : 'fas fa-video'}></i>
              </button>
              <button className="transparent-btns end-call-btn" onClick={endCall}>
                <i className='fas fa-phone-slash'></i>
              </button>
              <button className="transparent-btns" onClick={toggleAudio}>
                <i className={isAudioMuted ? 'fa fa-microphone-slash' : 'fa fa-microphone'}></i>
              </button>
            </div>
          </div>
          {incomingCall && (
            <div className="video-call-modal">
              <div className="video-call-modal-content">
                <h2>Incoming Call</h2>
                <p>{incomingCall.message} from {incomingCall.callerId}</p>
                <button onClick={acceptCall}>Accept</button>
                <button onClick={rejectCall}>Cancel</button>
              </div>
            </div>
          )}
        </div>
    );
}

