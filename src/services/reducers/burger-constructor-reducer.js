import {createSlice} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
//import {actionLoadIngredients} from './../actions/ingredients-constructor-actions.js'

const initialState={
    bun: null,
    data: [] // [ingridients]
}
const sliceBurgerConstructor = createSlice({
    name:"burgerConstructor",
    reducerPath: "burgerConstructor",
    initialState,
    reducers: {
        addIngredient:(state, action)=>{
            state.data = [...state.data,{...action.payload, uid: uuidv4()}]
        },
        delIngredient:(state, action)=>{
            state.data = state.data.filter(item => item.uid != action.payload.uid)//[...state.data,action.ingredient]
        },
        changeIngredient:(state, action)=>{
            const ingredientIndexA = state.data.findIndex(ingredient => ingredient.uid === action.payload.ingredientA)
            const ingredientIndexB = state.data.findIndex(ingredient => ingredient.uid === action.payload.ingredientB)    
            const ingredientA = state.data[ingredientIndexA]
            state.data[ingredientIndexA] = state.data[ingredientIndexB]
            state.data[ingredientIndexB] = ingredientA
            //[state.data[ingredientIndexA], state.data[ingredientIndexB]] = [state.data[ingredientIndexB], state.data[ingredientIndexA]]
        },
        addBun:(state, action)=>{
            state.bun = action.payload
        },
        delBun:(state)=>{
            state.bun = null
        }
    },
    selectors:{
        getBurgerIngredients: (state)=> state.data,
        getBurgerBun: (state)=> state.bun,
        getBurgerAllIngredients: (state)=> [...state.data,{...state.bun,uid: uuidv4()},{...state.bun,uid: uuidv4()}]
    }
})

export const {getBurgerIngredients,getBurgerBun,getBurgerAllIngredients} = sliceBurgerConstructor.selectors;
export const reducerBurgerConstructor = sliceBurgerConstructor.reducer;
export const {addIngredient, delIngredient, changeIngredient, addBun,delBun } = sliceBurgerConstructor.actions;