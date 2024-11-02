
//const url="https://norma.nomoreparties.space/api/ingredients"
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
    const response = await fetch(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'ingredients':ingredients})
    });
    if (!response.ok){
        throw new Error(`ingredients-api.createOrder: response.code=${response.code}`)
    }
    const data = await response.json()
    return data
}
export {loadAll,createOrder}