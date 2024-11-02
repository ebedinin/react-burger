import { configureStore } from "@reduxjs/toolkit";
import {reducerIngredient} from './../reducers/ingredients-reducer.js'
import { reducerIngredientDetail } from "./../reducers/ingredient-detail-reducer.js";
import { reducerBurgerConstructor } from "./../reducers/burger-constructor-reducer.js";
import { reducerOrder } from "./../reducers/order-reducer.js";

export const store = configureStore({
    reducer:{
        ingredients : reducerIngredient,
        ingredientDetail : reducerIngredientDetail,
        burgerConstructor : reducerBurgerConstructor,
        order : reducerOrder
    },
    devTools: process.env.NODE_ENV !== 'production'
})