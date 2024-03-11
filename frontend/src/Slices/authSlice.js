import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    userInfo:localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")):null
}

const authslice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCrenditials:(state,action)=>{
            state.userInfo = action.payload
            localStorage.setItem("userInfo",JSON.stringify(action.payload))

        },
        logOut:(state,action) =>{
            state.userInfo = null;
            localStorage.removeItem("userInfo")
        },
    

      

    }
})

export const {setCrenditials,logOut} = authslice.actions
export default authslice.reducer