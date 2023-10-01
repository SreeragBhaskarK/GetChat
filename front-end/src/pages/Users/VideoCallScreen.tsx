import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { socket } from '../../services/socketIo'
import { useLocation, useNavigate } from 'react-router-dom'
import { CallScreen } from '../../Components'
import { useDispatch, useSelector } from 'react-redux'

import { addConnectedCall, addVideoCall, endVideoCall } from '../../redux/callSlice'

const VideoCallScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [recipientUser, setRecipientUser] = useState<any>({})
    const [senderId, setSenderId] = useState()
    const [incomingCall, setIncomingCall] = useState(useSelector((state: any) => state.video_call.videoCall))
    const [connection, setConnection] = useState(useSelector((state: any) => state.video_call.connectedCall))
    const [localStream, setLocalStream] = useState<any>()
    const [remoteStreams, setRemoteStreams] = useState([]);
    const peerConnections = useRef({});
    const [callingButton, setCallingButton] = useState('Start Call')
    const dispatch = useDispatch()
    useEffect(() => {
        /* if (setRecipientUser) {
 
            socket.on('incoming_call', handleIncomingCall)
            socket.on('offer', handleOffer);
            socket.on('answer', handleAnswer)
            socket.on('ice-candidate', handleIceCandidate)
        } */



        socket.on('video_call_end', () => {
            console.log('dkfjkdjfkdjf');
            // Assuming localStream is a reference to the local media stream
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            dispatch(endVideoCall(false))
            window.location.href='/'
        })
    }, [socket])
    useEffect(() => {
        console.log(connection, incomingCall, 'check');

        if (connection && incomingCall.senderId && incomingCall.recipientId && localStream) {
            console.log('success', incomingCall.recipientId);

            joinIncomingCall({ senderId: incomingCall.senderId, recipientId: incomingCall.recipientId })
        }

    }, [connection, localStream, incomingCall])

    useEffect(() => {
        console.log(location.state, 'sta');
        if (location.state) {
            setRecipientUser(location.state.recipient)
            setSenderId(location.state.senderId)
            socket.emit('auth', location.state.senderId)
        } else {
            navigate(-1)
        }
    }, [])

    useEffect(() => {
        const data = location.state


        if (data.senderId && data.recipient) {


            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setLocalStream(stream)
                    socket.on('incoming_call', handleIncomingCall)
                    socket.on('offer', (offerData) => {
                        handleOffer(offerData, stream, data)
                    });
                    socket.on('answer', (answer) => {
                        handleAnswer(answer, data)
                    })
                    socket.on('ice-candidate', (candidate) => {
                        handleIceCandidate(candidate, data)
                    })
                })
        }
    }, [location.state])

    const handleIceCandidate = useCallback((candidate, data) => {
        console.log(data.recipient._id, '1,2');

        const peerConnection = peerConnections.current[data.recipient._id];

        if (peerConnection) {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
                .catch((error) => {
                    console.error('Error adding ICE candidate:', error);
                });
        } else {
            console.error(`Peer connection not found for user `);
        }
    }, [])

    const handleAnswer = useCallback((answer, data) => {



        const peerConnection = peerConnections.current[data.recipient._id];

        if (peerConnection) {
            peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
                .catch((error) => {
                    console.error('Error setting remote description:', error);
                });
        } else {
            console.error(`Peer connection not found for user ${data.recipient._id}`);
        }
    },[])

    const handleOffer = useCallback((offerData, stream, data) => {
        const { offer, recipientId, senderId } = offerData


        const peerConnection: any = new RTCPeerConnection();

        peerConnection.addStream(stream);


        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', { candidate: event.candidate, recipientId: data.recipient._id });
            }
        };





        peerConnection.onaddstream = (event) => {
            setRemoteStreams((prevStreams) => [...prevStreams, { userId: data.recipient._id, stream: event.stream }]);
        };


        peerConnection
            .setRemoteDescription(new RTCSessionDescription(offer))
            .then(() => peerConnection.createAnswer())
            .then((answer) => peerConnection.setLocalDescription(answer))
            .then(() => {
                socket.emit('answer', { answer: peerConnection.localDescription, recipientId: data.recipient._id });
            });


        peerConnections.current[data.recipient._id] = peerConnection;
        dispatch(addVideoCall({ recipientId, senderId }))
        dispatch(addConnectedCall(true))

    }, [])

    const handleIncomingCall = useCallback(({ senderId, recipientId }) => {


        setIncomingCall({ senderId, recipientId })

    }, [])

    const createPeerConnection = (senderId, recipientId, stream) => {


        const peerConnection: any = new RTCPeerConnection();


        peerConnection.addStream(stream)

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {


                socket.emit('ice-candidate', { candidate: event.candidate, recipientId: senderId });
            }
        };

        peerConnection.onaddstream = (event) => {
            setRemoteStreams((prevStreams) => [...prevStreams, { userId: senderId, stream: event.stream }]);
        };

        peerConnection
            .createOffer()
            .then((offer) => peerConnection.setLocalDescription(offer))
            .then(() => {
                socket.emit('offer', { offer: peerConnection.localDescription, recipientId: senderId, senderId: recipientId });
            });

        peerConnections.current[senderId] = peerConnection;
        dispatch(addConnectedCall(true))
    };

    const joinIncomingCall = ({ senderId, recipientId }) => {

        createPeerConnection(senderId, recipientId, localStream);
        /*   console.log(remoteStreams,'remoteStream'); */


    }
    const handleCalling = () => {
        try {

            setCallingButton('Calling...')
            socket.emit('calling', { senderId, recipientId: recipientUser?._id })
            /*   dispatch(addConnectedCall(true)) */
            const id = setTimeout(() => {
                setCallingButton('Not responding')
                /*   dispatch(addConnectedCall(false)) */
            }, 9000)
            clearTimeout(id)
            const defaultId = setTimeout(() => {
                setCallingButton('Start Call')
            }, 12000)
            clearTimeout(defaultId)



        } catch (err) {
            console.log(err);

        }
    }
    return !remoteStreams.length ? (
        <div>
            <div className='flex h-screen justify-center items-center'>

                <div >
                    <ReactPlayer url={localStream} className="bg-orange-500 rounded-t-lg" playing muted height="360px" width="640px" />
                    <div className='bg-[#1c1e21] rounded-b-lg h-16 w-[640px]'>
                    </div>
                </div>

                <div className='h-[424px] w-[348px] rounded-lg ml-4 bg-[#1c1e21] '>
                    <div className='p-5 h-full '>
                        <div>
                            <div className=' mb-2'>
                                <div className='w-[215px] m-auto'>
                                    <div className='h-[72px] mb-4 flex justify-center'>
                                        <img className='w-[72px] rounded-full' src={recipientUser.profile_pic} alt="" />
                                    </div>
                                    <div className='mt-4'>
                                        <span className='text-white text-2xl font-bold flex justify-center'>{recipientUser.username}</span>
                                    </div>

                                </div>

                            </div>
                            <div className='flex justify-center m-2'>
                                <span className='text-white'>
                                    Ready to call?
                                </span>
                            </div>
                            <div className='m-2 flex justify-center'>
                                <div className='h-12 flex items-center'>
                                    <div className='h-5'>
                                        {incomingCall.senderId && incomingCall.recipientId ? <button onClick={() => joinIncomingCall({ senderId: incomingCall.senderId, recipientId: incomingCall.recipientId })} className='bg-green-500 rounded-lg'><span className='text-white text-base font-semibold m-1'>JOIN</span></button> : <button onClick={() => handleCalling()} className='bg-blue-500 rounded-lg'><span className='text-white text-base font-semibold m-1'>{callingButton}</span></button>}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {/*  {remoteStreams.map((remote) => (
                    <video src={remote.stream} autoPlay playsInline />
                ))} */}
            </div>

        </div>
    ) : (
        <>

            <CallScreen remoteStream={remoteStreams} localStream={localStream} peerConnections={peerConnections} />

        </>
    )
}

export default VideoCallScreen