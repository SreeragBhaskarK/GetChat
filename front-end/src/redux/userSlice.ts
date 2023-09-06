import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
interface userState {
    userData:any
    isLoggedIn:boolean
    messagesIndication:boolean
}

const initialState: userState = {
   userData:{} ,
   isLoggedIn:false,
   messagesIndication:false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserData(state, actions) {
            state.userData = actions.payload
        },
        loginCheck(state,actions){
            state.isLoggedIn = actions.payload
            if(!actions.payload){
                state.userData={}
            }
        },
        addPost(state,actions){
            state.userData.posts.push(actions.payload)
        },
        updatePost(state,actions){
            state.userData.posts = state.userData.posts.map(post => {
                if (post.id === actions.payload.id) {
                    return actions.payload;
                }
                return post;
            });
        },
        
        messagesIndication(state,actions){
            state.messagesIndication=actions.payload
        },
    }
})

export const { addUserData,loginCheck,addPost,updatePost,messagesIndication } = userSlice.actions
export default userSlice.reducer