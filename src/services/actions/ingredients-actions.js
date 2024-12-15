import {createAsyncThunk,createAction} from '@reduxjs/toolkit'
import {loadAll} from './../api/ingredients-api.js'

const actionLoadIngredients = createAsyncThunk("INGREDIENTS/LOAD",
    async   ()=>{
	    return loadAll();
    }
);

export {actionLoadIngredients}