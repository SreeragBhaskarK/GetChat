// src/components/RemoteView.js
import React, { useEffect, useRef } from 'react';

const RemoteView = ({ remoteStream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
   
    
    if (remoteStream) {
      videoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return <video ref={videoRef} autoPlay playsInline />;
};

export default RemoteView;
