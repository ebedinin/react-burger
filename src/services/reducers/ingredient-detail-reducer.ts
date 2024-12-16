import {createSlice} from '@reduxjs/toolkit'
import { TIngredient } from '../api/type/ingredients';

const initialState={
    ingredientDetail:null as TIngredient[] | null
}
export type TState = typeof initialState
const sliceIngredientDetail = createSlice({
    name:"ingredientDetail",
    reducerPath: "ingredientDetail",
    initialState,
    reducers: {
        setIngredienttDetail:(state: TState, action)=>{
            state.ingredientDetail = action.payload
        }
    },
    selectors:{
        getIngredienttDetail: (state: TState)=> state.ingredientDetail
    }
})

export const {getIngredienttDetail} = sliceIngredientDetail.selectors;
export const reducerIngredientDetail = sliceIngredientDetail.reducer;
export const {setIngredienttDetail} = sliceIngredientDetail.actions;