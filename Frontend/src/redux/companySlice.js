import {createSlice} from "@reduxjs/toolkit"

const companySlice = createSlice({
    name : "company",
    initialState : {
        allCompanies : [],
        textToFilterCompany : "",
    },
    reducers : {
        setAllCompanies(state , action){
            state.allCompanies = action.payload;
        },
        setTextToFilterCompany(state , action){
            state.textToFilterCompany = action.payload;
        }
    }
})

export const {setAllCompanies , setTextToFilterCompany} = companySlice.actions;
export default companySlice.reducer;
