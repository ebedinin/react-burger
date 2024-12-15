import { checkReponse, fetchWithRefresh, baseUrl } from './utils/common.js'
const authorization = async (email, password)=>{
    const endPointUrl = "auth/login "
    const response = await fetch(baseUrl.concat(endPointUrl),{
        
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'email':email, 'password': password})
    });
    const data = await checkReponse(response);
    localStorage.setItem("refreshToken", data.refreshToken); 
    localStorage.setItem("accessToken", data.accessToken);
    return data
}

const registration = async (email, password, name)=>{
    const endPointUrl = "auth/register"
    const response = await fetch(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'email':email, 'password':password, 'name':name})
    });
    const data = await checkReponse(response);  
    localStorage.setItem("refreshToken", data.refreshToken); 
    localStorage.setItem("accessToken", data.accessToken);
    return data
}
const forgotPassword = async (email)=>{
    const endPointUrl = "password-reset"
    const response = await fetch(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'email':email})
    });
    return await checkReponse(response);
}
const resetPassword = async (password, code)=>{
    const endPointUrl = `password-reset/reset`
    const response = await fetch(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'password':password, 'token':code})
    });
    return await checkReponse(response);
}

const logout = async ()=>{
    const endPointUrl = "auth/logout"
    const response = await fetch(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("refreshToken")
          },
        body: JSON.stringify({'token':localStorage.getItem("refreshToken")})
    });
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    return await checkReponse(response);
}

  


const getUser = async ()=>{
    const endPointUrl = "auth/user"
    const data = await fetchWithRefresh(baseUrl.concat(endPointUrl),{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("accessToken")
          }
    })
    return data
}

const changeUser = async (user)=>{
    const endPointUrl = "auth/user"
    const data = await fetchWithRefresh(baseUrl.concat(endPointUrl),{
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("accessToken")
          },
        body: JSON.stringify({'email':user.email, 'name': user.name})
    });
    return data
}

export {authorization, registration, logout, getUser, fetchWithRefresh, forgotPassword, resetPassword, changeUser}