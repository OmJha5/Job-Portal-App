import {createSlice} from "@reduxjs/toolkit"

const jobSlice = createSlice({
    name : "job",
    initialState : {
        allJobs : [],
        singleJob : null,
        allJobsByCurr : [],
        textToFilterJob : "",
    },
    reducers : {
        setAllJobs(state , action){
            state.allJobs = action.payload;
        },
        setSingleJob(state , action){
            state.singleJob = action.payload
        },
        setTextToFilterJob(state , action){
            state.textToFilterJob = action.payload;
        },
        setAllJobsByCurr(state , action){
            state.allJobsByCurr = action.payload;
        }

    }
})

export const {setAllJobs , setSingleJob , setTextToFilterJob , setAllJobsByCurr} = jobSlice.actions;
export default jobSlice.reducer;
