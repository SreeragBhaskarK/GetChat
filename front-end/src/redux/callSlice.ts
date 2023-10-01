import { createSlice } from "@reduxjs/toolkit";
import { VideoCall } from "../pages/Users";
interface VideoCall {
    videoCall: {
        senderId: string
        recipientId: string
    },
    connectedCall:boolean

}

const initialState: VideoCall = {
    videoCall: {
        senderId: '',
        recipientId: '',
    },
    connectedCall:false
}

const videoCallSlice = createSlice({
    name: 'video_call',
    initialState,
    reducers: {
        addVideoCall(state, action) {
            console.log('videocall action ',action.payload);
            
            state.videoCall.senderId = action.payload.senderId
            state.videoCall.recipientId = action.payload.recipientId
        },
        addConnectedCall(state,action){
            state.connectedCall=action.payload
        },
        endVideoCall(state,action){
            state.videoCall= {
                senderId: '',
                recipientId: '',
            }
            state.connectedCall=action.payload
        }
       /*  addCallUser(state,action){
            state.videoCall.userData =action.payload
        },

        joinVideoCall(state, action) {
            state.videoCall.join = action.payload
        },
        addAns(state, action) {
            console.log(action.payload);

            state.videoCall.ans = action.payload
        },
        endCall(state, action) {
            if (action.payload) {

                state.videoCall = {
                    senderId: '',
                    recipientId: '',
                    join: false,
                    ans: {},
                    userData:{}
                }
            }
        } */

    }
})

export const { addVideoCall,addConnectedCall,endVideoCall} = videoCallSlice.actions
export default videoCallSlice.reducer