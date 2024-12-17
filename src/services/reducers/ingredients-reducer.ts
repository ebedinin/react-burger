import {createSlice} from '@reduxjs/toolkit'
import {actionLoadIngredients} from '../actions/ingredients-actions'
import {TIngredient} from './../api/type/ingredients'


const initialState={
    loading: true,
    isError: false,
    data: [] as TIngredient[]
}
export type TState = typeof initialState 
const sliceIngredients = createSlice({
    name:"ingredients",
    reducerPath: "ingredients",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(actionLoadIngredients.pending,(state:TState)=>{
                state.loading = true
            })
            .addCase(actionLoadIngredients.rejected, (state:TState)=>{
                state.loading=false
                state.isError=true
                state.data = []
            })
            .addCase(actionLoadIngredients.fulfilled, (state:TState,{ payload })=>{
                state.loading = false
                state.isError = false
                state.data = payload.data
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