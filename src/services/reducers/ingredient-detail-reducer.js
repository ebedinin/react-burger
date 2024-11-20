import {createSlice} from '@reduxjs/toolkit'

const initialState={
    ingredientDetail:null
}
const sliceIngredientDetail = createSlice({
    name:"ingredientDetail",
    reducerPath: "ingredientDetail",
    initialState,
    reducers: {
        setIngredienttDetail:(state, action)=>{
            state.ingredientDetail = action.payload
        }
    },
    selectors:{
        getIngredienttDetail: (state)=> state.ingredientDetail
    }
})

export const {getIngredienttDetail} = sliceIngredientDetail.selectors;
export const reducerIngredientDetail = sliceIngredientDetail.reducer;
export const {setIngredienttDetail} = sliceIngredientDetail.actions;