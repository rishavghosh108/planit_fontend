import { createSlice } from "@reduxjs/toolkit";
const initialValues = {
    events:[],
    verification:null,
    authorization:null,
    cards:[]
}

const userSlice = createSlice({
    name:'store',
    initialState:initialValues,
    reducers:{
        setEvent:(state,action)=>{
            state.events.push(action.payload);
        },
        setVerificationToken:(state,action)=>{
           state.verification = action.payload
        },
        setAuthoRizationToken:(state,action)=>{
           state.authorization = action.payload
        },
        saveCards:(state,action)=>{
            const exists = state.cards.find(card => card.id === action.payload.id);
            if (!exists) {
                state.cards.push(action.payload)
            }
        }
    }
})

export const { setEvent,setVerificationToken,setAuthoRizationToken,saveCards } = userSlice.actions;
export default userSlice.reducer;
