import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../services/socketIo';
import Peer from 'simple-peer';
import Webcam from 'react-webcam';

export const TestVideoCall = () => {
    const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const [otherUser, setOtherUser] = useState('');
  const webcamRef = useRef(null);

  useEffect(() => {
    // Get user media
    try {
        navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          webcamRef.current.srcObject = currentStream;
  
          // Connect to the signaling server
          socket.on('connect', () => {
            socket.emit('join-room', { roomId: 'your-room-id' });
          });
  
          socket.on('offer', (offer) => {
            const newPeer = new Peer({ initiator: false, trickle: false, stream: currentStream });
  
            newPeer.on('signal', (data) => {
              socket.emit('answer', { target: otherUser, answer: data });
            });
  
            newPeer.on('stream', (remoteStream) => {
              // Handle the remote stream
            });
  
            newPeer.signal(offer);
            setPeer(newPeer);
          });
  
          socket.on('answer', (answer) => {
            peer.signal(answer);
          });
  
          socket.on('ice-candidate', (candidate) => {
            peer.addIceCandidate(candidate);
          });
        });
  
      return () => {
        socket.disconnect();
      };
    } catch (error) {
        console.log(error,'video call error');
        
    }
  
  }, [peer, otherUser, socket]);

  const callPeer = () => {
    const newPeer = new Peer({ initiator: true, trickle: false, stream });

    newPeer.on('signal', (data) => {
      socket.emit('offer', { target: otherUser, offer: data });
    });

    newPeer.on('stream', (remoteStream) => {
      // Handle the remote stream
    });

    setPeer(newPeer);
  };

  const toggleMute = () => {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const toggleVideo = () => {
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  return (
    <div>
      <h1>WebRTC Video Call</h1>
      <div>
        <Webcam ref={webcamRef} muted autoPlay />
      </div>
      <div>
        <input
          type="text"
          placeholder="Other User ID"
          onChange={(e) => setOtherUser(e.target.value)}
        />
        <button onClick={callPeer}>Call</button>
        <button onClick={toggleMute}>Mute/Unmute</button>
        <button onClick={toggleVideo}>Toggle Video</button>
      </div>
    </div>
  );
};
  
export default TestVideoCall
