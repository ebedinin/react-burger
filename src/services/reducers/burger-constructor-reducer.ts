import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../api/type/ingredients';

export type TBurgerConstructorIngredient = TIngredient & {
        uid: string    
}
const initialState={
    bun: null as TIngredient | null,
    data: [] as TBurgerConstructorIngredient[]
}

type TState = typeof initialState
const sliceBurgerConstructor = createSlice({
    name:"burgerConstructor",
    reducerPath: "burgerConstructor",
    initialState,
    reducers: {
        addIngredient:(state:TState, action:PayloadAction<TBurgerConstructorIngredient>)=>{
            state.data = [...state.data,{...action.payload, uid: uuidv4()}]
        },
        delIngredient:(state:TState, action:PayloadAction<{uid:string}>)=>{
            state.data = state.data.filter(item => item.uid != action.payload.uid)
        },
        changeIngredient:(state:TState, action:PayloadAction<{ingredientA:string,ingredientB:string}>)=>{
            const ingredientIndexA = state.data.findIndex(ingredient => ingredient.uid === action.payload.ingredientA)
            const ingredientIndexB = state.data.findIndex(ingredient => ingredient.uid === action.payload.ingredientB)    
            const ingredientA = state.data[ingredientIndexA]
            state.data[ingredientIndexA] = state.data[ingredientIndexB]
            state.data[ingredientIndexB] = ingredientA
        },
        addBun:(state, action:PayloadAction<TIngredient>)=>{
            state.bun = action.payload
        },
        delBun:(state)=>{
            state.bun = null
        }
    },
    selectors:{
        getBurgerIngredients: (state:TState)=> state.data,
        getBurgerBun: (state:TState)=> state.bun,
        getBurgerAllIngredients: (state:TState)=> {            
            const ingredients :TBurgerConstructorIngredient[] =[...state.data]
            if(state.bun){
                ingredients.push({...state.bun,uid: uuidv4()})
                ingredients.push({...state.bun,uid: uuidv4()})
            }
            return ingredients
        }
    }
})

export const {getBurgerIngredients,getBurgerBun,getBurgerAllIngredients} = sliceBurgerConstructor.selectors;
export const reducerBurgerConstructor = sliceBurgerConstructor.reducer;
export const {addIngredient, delIngredient, changeIngredient, addBun,delBun } = sliceBurgerConstructor.actions;