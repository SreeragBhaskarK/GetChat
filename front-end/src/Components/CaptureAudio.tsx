import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { FaCirclePlay } from 'react-icons/fa6'
import { BsPauseCircleFill, BsStopCircleFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import { socket } from '../services/socketIo'
import api from '../services/api'
import { isFulfilled } from '@reduxjs/toolkit'


export const CaptureAudio = ({ recordAudio, setRecordAudio, userData, senderId,setMessages }) => {
    interface AudioLength {
        seconds: number
        minutes: number
    }
    const [recording, setRecording] = useState(true)
    const [recordingPlay, setRecordingPlay] = useState(true)
    const [timeStart, setTimeStart] = useState(true)
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [audioLength, setAudioLength] = useState<AudioLength>()

    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const audioRef = useRef(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioFile, setAudioFile] = useState<Blob>()

    useEffect(() => {
        if (timeStart) {

            const timerInterval = setInterval(() => {
                if (seconds === 59) {
                    setSeconds(0);
                    setMinutes((prevMinutes) => prevMinutes + 1);
                } else {
                    setSeconds((prevSeconds) => prevSeconds + 1);
                }
            }, 1000);
      

            if (audioLength?.seconds) {
             

                let current = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                let prev = `${audioLength.minutes < 10 ? '0' : ''}${audioLength.minutes}:${audioLength.seconds < 10 ? '0' : ''}${audioLength.seconds}`
               

                if (current == prev) {
            
                    setRecordingPlay(!recordingPlay)
                    setTimeStart(false)
                }
            }

            return () => clearInterval(timerInterval);

        }
    }, [seconds, timeStart]);
    useEffect(() => {
        startRecording()
    }, [])


    const startRecording = useCallback(() => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        audioChunks.push(e.data);
                        setAudioChunks((chunks) => [...chunks, e.data]);
                    }
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                

                    const url = URL.createObjectURL(audioBlob);
                    setAudioURL(url);
                    setAudioFile(audioBlob)
                };

                recorder.start();
                setIsRecording(true);
                setMediaRecorder(recorder);
            })
            .catch((err) => {
                console.error('Error accessing the microphone:', err);
            });
    }, [])

    const stopRecording = () => {
        if (mediaRecorder) {
           
            mediaRecorder.stop();
            setAudioLength({ seconds, minutes })

        }
    };

    const playRecording = () => {
        if (audioRef.current) {
            const audioElement = audioRef.current;
    

            // Add an event listener to the audio element to get the duration
            audioElement.addEventListener('onloadedmetadata', () => {
                const audioDuration = audioElement.duration; // Get the duration in seconds
                const minutes = Math.floor(audioDuration / 60);
                const seconds = Math.floor(audioDuration % 60);
 

            });
            setMinutes(0);
            setSeconds(0);
            audioElement.play();


            setTimeStart(true);
        }
    };

    const handleSubmit = () => {

        ; // You can adjust the file extension as needed
        if (audioLength.seconds > 0) {
            api.postUpload({ originalname: 'audio', mimetype: 'audio/wav', type: 'audio' }).then(async(response) => {
                if (response.data.success) {
                    const preSignedUrl = response.data.data;

                    const result = await fetch(preSignedUrl, {
                        method: 'PUT',
                        body: audioFile,
                        headers: {
                            'Content-Type': 'audio/wav', // Adjust the content type as needed
                        },
                    });
               

                    if (result.status == 200) {

                        const parsedUrl = new URL(result.url);
                      
                        const postUrl = parsedUrl.origin + parsedUrl.pathname
               

                        socket.emit('private_message', {
                            recipientId: userData?.memberDetails[0]?._id === senderId
                                ? userData?.memberDetails[1]._id
                                : userData?.memberDetails[0]._id,
                            senderId: senderId,
                            content: '',
                            audio: postUrl,
                            chatId: userData._id
                        });

                        setMessages((prevMessage) => [...prevMessage, {
                            chatId: userData._id, content: '', recipientId: userData.memberDetails[0]._id === senderId
                                ? userData.memberDetails[1]._id
                                : userData.memberDetails[0]._id, senderId, createdAt: new Date(),audio:postUrl
                        }])
                        setRecordAudio(false)
                    }
                }
            }).catch((err) => {
                console.log(err);

            })

        }



    }




    return (
        <div className='flex items-center justify-between h-full  w-full p-3 border-t border-gray-300'>
            <div className='w-7 h-7 rounded-2xl bg-[#0080FF] '>
                <AiFillCloseCircle onClick={() => setRecordAudio(!recordAudio)} className=' cursor-pointer w-full h-full rounded-full fill-white' />
            </div>
            <div className={`${recording && 'animate-pulse' || !recordingPlay && 'animate-pulse'} w-full flex justify-between  mx-3 h-full  bg-[#0080FF]  rounded-full outline-none focus:text-gray-700`}>
                {recording ? <BsStopCircleFill onClick={() => { setRecording(false), setTimeStart(false), stopRecording() }} className='cursor-pointer h-10 w-10 py-2 rounded-full fill-white' /> : recordingPlay ? <FaCirclePlay onClick={() => { setRecordingPlay(!recordingPlay), playRecording() }} className='cursor-pointer h-10 w-10 py-2 rounded-full fill-white' /> : <BsPauseCircleFill onClick={() => setRecordingPlay(!recordingPlay)} className='cursor-pointer h-10 w-10 py-2 rounded-full fill-white' />}
                <div className=' w-12 m-2 text-[#0080FF] bg-white rounded-2xl  '><span className='flex h-full justify-center items-center font-semibold text-xs'>{`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</span></div>
            </div>
            <button onClick={handleSubmit} className='text-[#0080FF] font-semibold text-sm'>
                Send
            </button>
            <audio className='hidden' ref={audioRef} src={audioURL} controls />

        </div>
        /*        <div>
                   <button onClick={startRecording} disabled={isRecording}>
                       Start Recording
                   </button>
                   <button onClick={stopRecording} disabled={!isRecording}>
                       Stop Recording
                   </button>
                   <button onClick={playRecording} disabled={!audioURL}>
                       Play Recording
                   </button>
                   <audio ref={audioRef} src={audioURL} controls />
               </div> */
    )
}

export default CaptureAudio