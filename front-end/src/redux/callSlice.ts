import { createSlice } from "@reduxjs/toolkit";
import { VideoCall } from "../pages/Users";
interface VideoCall {
    videoCall: {
        senderId: string
        recipientId: string
        join: boolean
        ans: object
        userData:object
    }

}

const initialState: VideoCall = {
    videoCall: {
        senderId: '',
        recipientId: '',
        join: false,
        ans: {},
        userData:{}
    }
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
        addCallUser(state,action){
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
        }

    }
})

export const { addVideoCall, joinVideoCall, addAns, endCall,addCallUser } = videoCallSlice.actions
export default videoCallSlice.reducer