import { createSlice } from "@reduxjs/toolkit";
interface userState {
    adminData:object
    isLoggedInAdmin:boolean
}
const initialState: userState = {
   adminData:{},
   isLoggedInAdmin:false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addAdminData(state, actions) {
            state.adminData = actions.payload
        },
        loginCheckAdmin(state,actions){
            state.isLoggedInAdmin = actions.payload
        }
    }
})

export const { addAdminData,loginCheckAdmin } = adminSlice.actions
export default adminSlice.reducer