import { combineSlices, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { sliceIngredients, TIngredientAtions} from '../reducers/ingredients-reducer'
import { sliceIngredientDetail, TIngredientDetailAtions } from "../reducers/ingredient-detail-reducer";
import { sliceBurgerConstructor, TBurgerConstructorAtions } from "../reducers/burger-constructor-reducer";
import { sliceOrder, TOrderAtions } from "../reducers/order-reducer";
import { sliceUser, TUserAtions } from "../reducers/user-reducer";
import { useDispatch as useDispatchRedux, useSelector as useSelectorRedux} from "react-redux";

const rootReducer = combineSlices(sliceIngredientDetail,sliceIngredients ,sliceBurgerConstructor, sliceOrder, sliceUser)

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})

export type TRootState = ReturnType<typeof rootReducer>
export type TAppActions =  TUserAtions | TOrderAtions | TBurgerConstructorAtions | TIngredientDetailAtions | TIngredientAtions

type AppDispatch = ThunkDispatch<TRootState, unknown, TAppActions>;

export const useDispatch =  useDispatchRedux.withTypes<AppDispatch>();
export const useSelector =  useSelectorRedux.withTypes<TRootState>();