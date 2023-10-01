import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { MdCallEnd } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
/* import { endCall } from '../redux/callSlice' */
import { socket } from '../services/socketIo'
import webRTC from '../services/webRTC'
import { useNavigate } from 'react-router-dom'
import RemoteView from './RemoteView'
import { endVideoCall } from '../redux/callSlice'
import { BiSolidMicrophone, BiSolidMicrophoneOff, BiSolidVolumeMute, BiVolumeFull } from 'react-icons/bi'
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from 'react-icons/bs'


export const CallScreen = ({ localStream, remoteStream, peerConnections }) => {
  const dispatch = useDispatch()
  const videoCall = useSelector((state: any) => state?.video_call.videoCall)
  const navigate = useNavigate()
  const [remoteMute, setRemoteMute] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [videoScreen, setVideoScreen] = useState(true)
  const handleEndCall = () => {
    console.log(videoCall.senderId);

    socket.emit('video_call_end', { recipientId: videoCall.senderId })
    // Assuming localStream is a reference to the local media stream
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    peerConnections.current = ''
    dispatch(endVideoCall(false))
    window.location.href = '/'
  }


useEffect(()=>{
  localStream.getAudioTracks().forEach((track) => {
    track.enabled = !isMuted; // Toggle the track's enabled state
  });
},[localStream,isMuted])

useEffect(()=>{
  localStream.getVideoTracks().forEach((track) => {
    track.enabled = videoScreen;
  });
},[localStream,videoScreen])



  /*
    useEffect(() => {
      socket.on('callEnd', (data) => {
        console.log('call ended', data);
        webRTC.getEnd(data.ans)
        dispatch(endCall(true))
        navigate('/')
        
      })
    }, [socket]) */

  /*   const videoRef = useRef(null); */
  /*   useEffect(()=>{
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = true
      });
    },[]) */
  /*    useEffect(() => {
       if (remoteStream) {
         videoRef.current.srcObject = remoteStream;
       }
     }, [remoteStream]);
  */
  return (
    <>
      <h1>CallScreen</h1>
      <div className='w-fit m-auto mb-20' >
        <ReactPlayer className="bg-orange-500 rounded-t-lg" playing muted url={localStream} height="360px" width="640px" />
        <div className='bg-[#1c1e21] rounded-b-lg h-16 w-[640px] flex justify-center items-center'>
          <MdCallEnd fill="white" className="cursor-pointer m-3" onClick={() => handleEndCall()} />
         {isMuted? <BiSolidMicrophoneOff fill="white" className="cursor-pointer m-3" onClick={() => setIsMuted(false)} />:
          <BiSolidMicrophone fill="white" className="cursor-pointer m-3" onClick={() => setIsMuted(true)} />}
         {videoScreen? <BsFillCameraVideoFill fill="white" className="cursor-pointer m-3" onClick={() => setVideoScreen(false)} />:
          <BsFillCameraVideoOffFill fill="white" className="cursor-pointer m-3" onClick={() => setVideoScreen(true)} />}
        </div>
      </div>
      <div className='w-fit m-auto' >
        {/* <RemoteView key={index} remoteStream={remote.stream} /> */}
        {remoteStream.map((remote, index) => (
          <>
            <ReactPlayer key={index} className="bg-orange-500 rounded-t-lg" muted={remoteMute} playing url={remote.stream} height="360px" width="640px" />
            <div className='bg-[#1c1e21] rounded-b-lg h-16 w-[640px] flex justify-center items-center'>
              {remoteMute ? <BiSolidVolumeMute fill="white" className="cursor-pointer" onClick={() => setRemoteMute(false)} />
                : <BiVolumeFull fill="white" className="cursor-pointer" onClick={() => setRemoteMute(true)} />}
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default CallScreen