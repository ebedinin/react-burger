import {createAsyncThunk} from '@reduxjs/toolkit'
import {createOrder} from '../api/ingredients-api'
import {TResponseOrder} from '../api/type/order'

const actionCreateOrder = createAsyncThunk<TResponseOrder,string[]>("ORDER/CREATE",
    async (ingredients)=>{
	    return createOrder(ingredients);
    }
);
export {actionCreateOrder}