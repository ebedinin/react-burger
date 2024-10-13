import {createSlice} from '@reduxjs/toolkit'
import {actionLoadIngredients} from './../actions/ingredients-actions.js'

const initialState={
    loading: true,
    isError: false,
    data: [],
    ingredientDetail:null
}
const sliceIngredients = createSlice({
    name:"ingredients",
    reducerPath: "ingredients",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(actionLoadIngredients.pending,(state)=>{
                //debugger
                state.loading = true
            })
            .addCase(actionLoadIngredients.rejected, (state,action)=>{
                //debugger
                state.loading=false
                state.isError=true
            })
            .addCase(actionLoadIngredients.fulfilled, (state,action)=>{
                state.loading = false
                //debugger
                state.isError = false
                state.data = action.payload
            })
    },
    selectors:{
        getLoading: (state)=> state.loading,
        getError: (state)=> state.isError,
        getIngredients: (state)=> state.data
    }
})

export const {getLoading,getError,getIngredients} = sliceIngredients.selectors;
export const reducerIngredient = sliceIngredients.reducer;