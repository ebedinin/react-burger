
import {fetchWithRefresh} from './user-api'
const baseUrl = "https://norma.nomoreparties.space/api/"
const loadAll = async ()=>{
    const endPointUrl = "ingredients"
    const response = await fetch(baseUrl.concat(endPointUrl));
    if (!response.ok){
        throw new Error(`ingredients-api.loadAll: response.code=${response.code}`)
    }
    const data = await response.json()
    return data.data
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