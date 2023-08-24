import { createSlice } from "@reduxjs/toolkit";
interface userState {
    userData:any
    isLoggedIn:boolean
}

const initialState: userState = {
   userData:{} ,
   isLoggedIn:false
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
        }
    }
})

export const { addUserData,loginCheck,addPost,updatePost } = userSlice.actions
export default userSlice.reducer