import { createSlice } from "@reduxjs/toolkit";
const initialValues = {
    events:[],
    verification:null
}

const userSlice = createSlice({
    name:'store',
    initialState:initialValues,
    reducers:{
        setEvent:(state,action)=>{
            state.events.push(action.payload);
        },
        setToken:(state,action)=>{
           state.verification = action.payload
        }
    }
})

export const { setEvent,setToken } = userSlice.actions;
export default userSlice.reducer;
