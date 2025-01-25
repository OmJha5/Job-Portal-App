import {createSlice} from "@reduxjs/toolkit"

const companySlice = createSlice({
    name : "company",
    initialState : {
        allCompanies : [],
    },
    reducers : {
        setAllCompanies(state , action){
            state.allCompanies = action.payload;
        },
    }
})

export const {setAllCompanies} = companySlice.actions;
export default companySlice.reducer;
