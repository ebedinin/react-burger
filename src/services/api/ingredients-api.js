
import { checkReponse, fetchWithRefresh } from './utils/common.js'
const baseUrl = "https://norma.nomoreparties.space/api/"
const loadAll = async ()=>{
    const endPointUrl = "ingredients"
    const response = await fetch(baseUrl.concat(endPointUrl));
    return await checkReponse(response)
}

const createOrder = async (ingredients)=>{
    const endPointUrl = "orders"
    const data = await fetchWithRefresh(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("accessToken")
          },
        body: JSON.stringify({'ingredients':ingredients})
    });
    return data
}
export {loadAll,createOrder}