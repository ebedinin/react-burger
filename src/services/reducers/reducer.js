import { combineSlices } from '@reduxjs/toolkit'
import { reducerIngredient } from "./ingredients-reducer";
import { reducerIngredientDetail } from "./ingredient-detail-reducer";

export const rootReducer = combineSlices(reducerIngredient,reducerIngredientDetail)