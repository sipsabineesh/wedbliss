

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import Header from '../../components/Header';

const socket = io('https://wedbliss.live');

export default function VideoChat() { 
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.id || '';
  const [remoteId, setRemoteId] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [incomingCall, setIncomingCall] = useState({});
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const peerConnectionConfig = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
    ],
  };

 
  useEffect(() => {
    if (currentUser) {
        socket.emit('joinRoom', currentUser._id);
        console.log('Emitted joinRoom with', currentUser._id);
// alert("joininnng room")
}
}, [currentUser]);


useEffect(() => {
  const handleCallNotification = ({ receiverId,callerId, message }) => {
    console.log('callNotification event received');
    console.log('Incoming call from:', callerId);
    setIncomingCall({ receiverId,callerId, message });
    setRemoteId(callerId);
    console.log("incomingCall  :"+incomingCall)

    console.log("remoteId  :"+remoteId)
    startCall();
  };

  socket.on('callNotification', handleCallNotification);

  return () => {
    socket.off('callNotification', handleCallNotification);
  };
}, []);

  // useEffect(() => {
    
// const handleCallNotification = ({ callerId, message }) => { 
//   console.log('callNotification event received');
//   console.log('Incoming call from:', callerId);
//   setIncomingCall({ callerId, message });
//   alert("IncomingCall set "+incomingCall)
//   setRemoteId(callerId);
//   alert("REMOTEID:  "+remoteId)
//   startCall()
// };
        // const handleCallNotification = ({ receiverId, callerId, message }) => {
        //     alert(`${message} from ${callerId}`);
           
        // };

//         socket.on('callNotification', handleCallNotification);

//         return () => {
//             socket.off('callNotification', handleCallNotification);
//         };
    
// }, [currentUser]);

  useEffect(() => {
    // socket.on('your-id', id => {
    //   console.log('Your ID:', id);
    //   alert(`Your ID is: ${id}`);
    // }); 

   
    socket.emit('incomingCall', { callerId: socket.id, receiverId: userId });
    socket.on('offer', handleReceiveOffer);
    socket.on('answer', handleReceiveAnswer);
    socket.on('ice-candidate', handleNewICECandidateMsg);
    // socket.on('callNotification', handleCallNotification);

    return () => {
      socket.off('offer', handleReceiveOffer);
      socket.off('answer', handleReceiveAnswer);
      socket.off('ice-candidate', handleNewICECandidateMsg);
      // socket.off('callNotification', handleCallNotification);
    };
  }, []);

  useEffect(() => {
    alert('Ringing.....', remoteId);
  }, [remoteId]);
  
  

  const startCall = async () => {
    alert("Connecting...");
    // alert("REMOTE ID INSIDE START CALL: "+remoteId)
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
    const audioTrack = localStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsAudioMuted(!audioTrack.enabled);
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
    }

    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setRemoteId('');
    navigate('/');
  };

  const acceptCall = (remoteId) => {
    setIncomingCall(null);
    if(remoteId)
      startCall(remoteId);
  };

  const rejectCall = () => {
    setIncomingCall(null);
    socket.emit('callRejected', { callerId: remoteId });
  };

  return (
    <div className="App">
      <Header/>
      <h1>Video Chat</h1>
      <div className="video-container">
        <video ref={localVideoRef} autoPlay muted className="local-video"></video>
        <video ref={remoteVideoRef} autoPlay className="remote-video"></video>
      </div>
      <div>
        {/* <input
          type="text"
          placeholder="Enter Remote ID"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
        />
        <button className="btns" onClick={startCall}>Start Call</button> */}
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
      {/* {incomingCall && (
        <div className="modal">
          <div className="modal-content">
            <h2>Incoming Call</h2>
            <p>{incomingCall.message} from {incomingCall.callerId}</p>
            <button onClick={acceptCall}>Accept</button>
            <button onClick={rejectCall}>Cancel</button>
          </div>
        </div>
      )} */}
       {incomingCall && (
        incomingCall.receiverId === currentUser._id && (
          <div className="video-call-modal">
              <div className="video-call-modal-content">
                <h2>Incoming Call</h2>
                <p>{incomingCall.message} from {incomingCall.callerId}</p>
                <button className="btns me-2" onClick={() => acceptCall(incomingCall.callerId)}>Accept</button>
                <button className="btns" onClick={() => rejectCall(incomingCall.callerId)}>Cancel</button>
              </div>
            </div>
        )
            
          )}
    </div>
  );
}


