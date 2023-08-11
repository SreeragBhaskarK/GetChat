import { createSlice } from "@reduxjs/toolkit";
interface userState {
    userData:object
    isLoggedIn:boolean
}
const initialState: userState = {
   userData:{},
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
        }
    }
})

export const { addUserData,loginCheck } = userSlice.actions
export default userSlice.reducer