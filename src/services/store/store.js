import { configureStore } from "@reduxjs/toolkit";
import {reducerIngredient} from './../reducers/ingredients-reducer.js'
import { reducerIngredientDetail } from "./../reducers/ingredient-detail-reducer.js";

export const store = configureStore({
    reducer:{
        ingredients : reducerIngredient,
        ingredientDetail : reducerIngredientDetail
    },
    devTools: process.env.NODE_ENV !== 'production'
})