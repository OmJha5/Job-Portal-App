import {createSlice} from "@reduxjs/toolkit"

const applicationSlice = createSlice({
    name : "application",
    initialState : {
        allApplicationOfAJob : [],
        allApplicationOfAUser : [],
    },
    reducers : {
        setAllApplicationOfAJob(state , action){
            state.allApplicationOfAJob = action.payload;
        },

        setAllApplicationOfAUser(state , action){
            state.allApplicationOfAUser = action.payload;
        }
        
    }
})

export const {setAllApplicationOfAJob , setAllApplicationOfAUser} = applicationSlice.actions;
export default applicationSlice.reducer;
