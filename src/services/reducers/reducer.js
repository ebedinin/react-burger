import { combineSlices } from '@reduxjs/toolkit'
import { reducerIngredient } from "./ingredients-reducer.js";
import { reducerIngredientDetail } from "./ingredient-detail-reducer.js";
//import { reducerBurgerConstructor } from "./burger-constructor-reducer.js";

export const rootReducer = combineSlices(reducerIngredient,reducerIngredientDetail)