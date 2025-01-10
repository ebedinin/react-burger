import {createAsyncThunk} from '@reduxjs/toolkit'
import {createOrder} from '../api/ingredients-api'
import {TResponseOrder} from '../api/type/order'

const actionCreateOrder = createAsyncThunk<TResponseOrder,string[]>("ORDER/CREATE",
    async (ingredients)=>{
	    return createOrder(ingredients);
    }
);
const actionGetOrder = createAsyncThunk<TResponseOrder,string[]>("FEED/ORDER/GET",
    async (ingredients)=>{
	    return createOrder(ingredients);
    }
);

export type TExternalOrderAtions = ReturnType<typeof actionCreateOrder>
export {actionCreateOrder}