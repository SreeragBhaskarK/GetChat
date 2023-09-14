import React, { useEffect, useState, useCallback } from 'react'
import ReactPlayer from 'react-player'
import { useLocation, useNavigate } from 'react-router-dom'
import { socket } from '../../services/socketIo'
import webRTC from '../../services/webRTC'
import { useDispatch, useSelector } from 'react-redux'
import { CallScreen } from '../../Components'
import { addAns, addVideoCall, joinVideoCall } from '../../redux/callSlice'



export const VideoCall = () => {
    const [streamData, setStreamData] = useState<MediaStream>()
    const [calling, setCalling] = useState('Start Call')

    const userDetails = useSelector((state: any) => state.user.userData)
    const videoCallData = useSelector((state: any) => state?.video_call.videoCall)
    const dispatch = useDispatch()
    const [remoteStream, setRemoteStream] = useState()

    /* useEffects */


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((response) => {
            console.log(response, 'streamData');

            setStreamData(response)
            
        })
        socket.emit('auth', userDetails._id)
        socket.on('incommingCall', handleIncommingCall)

        socket.on('callAccepted', handleCallAccepted)
        socket.on('negotiationneeded', handleNegotiation)
        socket.on('peerNegoFinal', handleNegotiationDone)
        return () => {
            socket.off('incommingCall', handleIncommingCall)
            socket.off('callAccepted', handleCallAccepted)
            socket.off('peerNegoFinal', handleNegotiationDone)
            socket.off('negotiationneeded', handleNegotiation)
        }
    }, [socket])





    useEffect(() => {
        webRTC.peer.addEventListener('negotiationneeded', async () => {
            console.log(videoCallData, 'evvvvvvvent');

            const offer = await webRTC.getOffer()
            socket.emit('peerNegoNeeded', { offer, userData: videoCallData.userData })

        })

        return () => {
            webRTC.peer.removeEventListener('negotiationneeded', async () => {
                const offer = await webRTC.getOffer()
                socket.emit('peerNegoNeeded', { offer, userData: videoCallData.userData })

            })
        }
    }, [])

    useEffect(() => {
        console.log(remoteStream,'/////');
        
        webRTC.peer.addEventListener('track', async ev => {
            console.log('/////s');
            const remoteStream = await ev.streams
            console.log(remoteStream, '//////stream');

            setRemoteStream(remoteStream[0])
        })

    }, [])

    /* Call back functions */

    const handleCallAccepted = useCallback(async (data) => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        console.log('accepted request', data);
        await webRTC.setLocalDescription(data.ans)
        console.log(stream, 'gett tracl');


        for (const track of stream.getTracks()) {
            await webRTC.peer.addTrack(track, stream)
        }
        console.log(videoCallData, 'videoooooooooo');

        dispatch(addVideoCall({ senderId: data.userData.senderId, recipientId: data.userData.recipient._id }))
        dispatch(joinVideoCall(true))

    }, [streamData, webRTC])

    const handleNegotiationDone = useCallback(async (data) => {
        console.log('negooodonen', data);

        await webRTC.setLocalDescription(data.ans)

    }, [socket])

    const handleNegotiation = useCallback(async (data) => {

        console.log(data, 'negoooooooo');
        const ans = await webRTC.getAnswer(data.offer)
        socket.emit('peerNegoDone', { ans, userData: videoCallData.userData })
    }, [socket, videoCallData])



    const handleIncommingCall = useCallback(async (data) => {
        dispatch(addVideoCall({ senderId: data.userData.senderId, recipientId: data.userData.recipient._id }))
        console.log(data, "🥰🥰🥰🥰");

        const ans = await webRTC.getAnswer(data.offer)
        console.log(ans, '//////🔥🔥🔥🔥🔥');

        dispatch(addAns(ans))

    }, [webRTC])


    /* functions */

    const handleCall = async () => {
        setCalling('calling...')
        console.log(videoCallData.userData, 'videocallhandlecall');

        const offer = await webRTC.getOffer()
        socket.emit('calling', { userData: videoCallData.userData, offer })

    }

    const joinCall = async () => {

        console.log(videoCallData, 'joinned');

        if (videoCallData.ans.type && streamData.active) {
            console.log(streamData.active, '/////active');

            socket.emit('callAccepted', { userData: videoCallData.userData, ans: videoCallData.ans })
            for (const track of streamData.getTracks()) {
                webRTC.peer.addTrack(track, streamData)
            }

            dispatch(joinVideoCall(true))

        }

    }


    return !videoCallData.join ? (
        <>
            <div>
                <div className='flex h-screen justify-center items-center'>

                    <div >
                        <ReactPlayer className="bg-orange-500 rounded-t-lg" playing muted url={streamData} height="360px" width="640px" />
                        <div className='bg-[#1c1e21] rounded-b-lg h-16 w-[640px]'>
                        </div>
                    </div>

                    <div className='h-[424px] w-[348px] rounded-lg ml-4 bg-[#1c1e21] '>
                        <div className='p-5 h-full '>
                            <div>
                                <div className=' mb-2'>
                                    <div className='w-[215px] m-auto'>
                                        <div className='h-[72px] mb-4 flex justify-center'>
                                            <img className='w-[72px] rounded-full' src={videoCallData.userData?.recipient.profile_pic} alt="" />
                                        </div>
                                        <div className='mt-4'>
                                            <span className='text-white text-2xl font-bold flex justify-center'>{videoCallData.userData.recipient.username}</span>
                                        </div>

                                    </div>

                                </div>
                                <div className='flex justify-center m-2'>
                                    {calling == 'Start Call' && !videoCallData.senderId && <span className='text-white'>
                                        Ready to call?
                                    </span>}
                                </div>
                                <div className='m-2 flex justify-center'>
                                    <div className='h-12 flex items-center'>
                                        <div className='h-5'>
                                            {videoCallData.senderId ? <button onClick={() => joinCall()} className='bg-green-500 rounded-lg'><span className='text-white text-base font-semibold m-1'>JOIN</span></button> : <button onClick={() => handleCall()} className='bg-blue-500 rounded-lg'><span className='text-white text-base font-semibold m-1'>{calling}</span></button>}
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </>
    ) : (
        <>
            <CallScreen userData={videoCallData.userData} remoteStream={remoteStream} streamData={streamData} />
        </>
    )
}

export default VideoCall