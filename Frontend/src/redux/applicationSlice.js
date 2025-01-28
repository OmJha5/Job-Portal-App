import {createSlice} from "@reduxjs/toolkit"

const applicationSlice = createSlice({
    name : "application",
    initialState : {
        allApplicationOfAJob : [],
    },
    reducers : {
        setAllApplicationOfAJob(state , action){
            state.allApplicationOfAJob = action.payload;
        }
        
    }
})

export const {setAllApplicationOfAJob} = applicationSlice.actions;
export default applicationSlice.reducer;
