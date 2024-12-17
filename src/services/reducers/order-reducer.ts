import {createSlice} from '@reduxjs/toolkit'
import {actionCreateOrder} from './../actions/order-actions'
import { TOrder } from '../api/type/order.js'
const initialState={
    loading: true,
    isError: false,
    name:"",
    order: null as TOrder | null
}

export type TState = typeof initialState
const sliceOrder = createSlice({
    name:"order",
    reducerPath: "order",
    initialState,
    reducers: {
        clearOrder:(state)=>{
            state.order = null
            state.name = ""
        }},
    extraReducers:(builder)=>{
        builder
            .addCase(actionCreateOrder.pending,(state)=>{
                state.loading = true
            })
            .addCase(actionCreateOrder.rejected, (state)=>{
                state.loading=false
                state.isError=true
                state.name = ""
                state.order = null
            })
            .addCase(actionCreateOrder.fulfilled, (state,action)=>{
                state.loading = false
                state.isError = false
                state.name = action.payload.name
                state.order = action.payload.order
            })
    },
    selectors:{
        getLoading: (state)=> state.loading,
        getError: (state)=> state.isError,
        getOrder: (state)=> state.order
    }
})

export const {getLoading,getError,getOrder} = sliceOrder.selectors;
export const {clearOrder} = sliceOrder.actions;
export const reducerOrder = sliceOrder.reducer;