
import { checkReponse, fetchWithRefresh ,baseUrl} from './utils/common'
import {TResponseIngredients} from './../api/type/ingredients'
import {TResponseOrder} from './../api/type/order'
const loadAll = async ()=>{
    const endPointUrl = "ingredients"
    const response = await fetch(baseUrl.concat(endPointUrl));
    const data:TResponseIngredients = await checkReponse(response)
    return data
}

const createOrder = async (ingredients:string[])=>{
    const endPointUrl = "orders"
    const data: TResponseOrder = await fetchWithRefresh(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'ingredients':ingredients})
    });
    return data
}
export {loadAll,createOrder}