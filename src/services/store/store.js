import { configureStore } from "@reduxjs/toolkit";
import {reducerIngredient} from './../reducers/ingredients-reducer'
import { reducerIngredientDetail } from "./../reducers/ingredient-detail-reducer";
import { reducerBurgerConstructor } from "./../reducers/burger-constructor-reducer";
import { reducerOrder } from "./../reducers/order-reducer";
import { reducerUser } from "./../reducers/user-reducer";

export const store = configureStore({
    reducer:{
        ingredients : reducerIngredient,
        ingredientDetail : reducerIngredientDetail,
        burgerConstructor : reducerBurgerConstructor,
        order : reducerOrder,
        user : reducerUser
    },
    devTools: process.env.NODE_ENV !== 'production'
})
