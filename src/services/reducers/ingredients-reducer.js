import {createSlice} from '@reduxjs/toolkit'
import {actionLoadIngredients} from './../actions/ingredients-actions.js'

const initialState={
    loading: true,
    isError: false,
    data: []
}
const sliceIngredients = createSlice({
    name:"ingredients",
    reducerPath: "ingredients",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(actionLoadIngredients.pending,(state)=>{
                state.loading = true
            })
            .addCase(actionLoadIngredients.rejected, (state,action)=>{
                state.loading=false
                state.isError=true
                state.data = []
            })
            .addCase(actionLoadIngredients.fulfilled, (state,action)=>{
                state.loading = false
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