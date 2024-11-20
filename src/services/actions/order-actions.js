import {createAsyncThunk} from '@reduxjs/toolkit'
import {createOrder} from '../api/ingredients-api.js'

const actionCreateOrder = createAsyncThunk("ORDER/CREATE",
    async (ingredients)=>{
	    return createOrder(ingredients);
    }
);
export {actionCreateOrder}