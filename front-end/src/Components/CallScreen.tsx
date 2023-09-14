import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { MdCallEnd } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { endCall } from '../redux/callSlice'
import { socket } from '../services/socketIo'
import webRTC from '../services/webRTC'
import { useNavigate } from 'react-router-dom'


export const CallScreen = ({ userData,streamData,remoteStream }) => {
  const dispatch = useDispatch()
  const videoCall = useSelector((state: any) => state?.video_call.videoCall)
  const navigate = useNavigate()
  const handleEndCall = () => {
    socket.emit('callEnd', { userData, ans: videoCall.ans })
    dispatch(endCall(true))
    navigate('/')
  }

  useEffect(() => {
    socket.on('callEnd', (data) => {
      console.log('call ended', data);
      webRTC.getEnd(data.ans)
      dispatch(endCall(true))
      navigate('/')
      
    })
  }, [socket])
  return (
    <>
      <h1>CallScreen</h1>
      <div className='w-fit m-auto mb-20' >
        <ReactPlayer className="bg-orange-500 rounded-t-lg" playing muted url={streamData} height="360px" width="640px" />
        <div className='bg-[#1c1e21] rounded-b-lg h-16 w-[640px] flex justify-center items-center'>
          <MdCallEnd fill="white" className="cursor-pointer" onClick={() => handleEndCall()} />
        </div>
      </div>
      <div className='w-fit m-auto' >
        <ReactPlayer className="bg-orange-500 rounded-t-lg" playing muted url={remoteStream} height="360px" width="640px" />
        
      </div>
    </>
  )
}

export default CallScreen