import {createAsyncThunk,createAction} from '@reduxjs/toolkit'
import {loadAll} from '../api/ingredients-api'
import { TResponseIngredients } from '../api/type/ingredients';

const actionLoadIngredients = createAsyncThunk<TResponseIngredients>("INGREDIENTS/LOAD",
    async   ()=>{
	    return loadAll();
    }
);

export {actionLoadIngredients}