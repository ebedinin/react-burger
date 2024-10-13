
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

export {loadAll}