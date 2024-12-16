import { TUser, TResponseUser, TResponseSession, TResponseLogin } from './type/user';
import { checkReponse, fetchWithRefresh, baseUrl } from './utils/common'
const authorization = async (email:string, password:string)=>{
    const endPointUrl = "auth/login "
    const response = await fetch(baseUrl.concat(endPointUrl),{        
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'email':email, 'password': password})
    });
    const data: TResponseLogin = await checkReponse(response);
    localStorage.setItem("refreshToken", data.refreshToken); 
    localStorage.setItem("accessToken", data.accessToken);
    return data
}

const registration = async (email:string, password:string, name:string)=>{
    const endPointUrl = "auth/register"
    const response = await fetch(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'email':email, 'password':password, 'name':name})
    });
    const data: TResponseLogin = await checkReponse(response);  
    localStorage.setItem("refreshToken", data.refreshToken); 
    localStorage.setItem("accessToken", data.accessToken);
    return data
}
const forgotPassword = async (email:string)=>{
    const endPointUrl = "password-reset"
    const response = await fetch(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'email':email})
    });
    const data: TResponseSession = await checkReponse(response)
    return data;
}


const resetPassword = async (password:string, code:string)=>{
    const endPointUrl = `password-reset/reset`
    const response = await fetch(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'password':password, 'token':code})
    });
    const data: TResponseSession = await checkReponse(response)
    return data;
}

const logout = async ()=>{
    const endPointUrl = "auth/logout"
    const response = await fetch(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': String(localStorage.getItem("refreshToken"))
          },
        body: JSON.stringify({'token':localStorage.getItem("refreshToken")})
    });
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    const data: TResponseSession = await checkReponse(response)
    return data;
}


const getUser = async ()=>{
    const endPointUrl = "auth/user"
    const data: TResponseUser = await fetchWithRefresh(baseUrl.concat(endPointUrl),{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    })
    return data
}

const changeUser = async (email:string, name:string)=>{
    const endPointUrl = "auth/user"
    const data: TResponseUser = await fetchWithRefresh(baseUrl.concat(endPointUrl),{
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'email':email, 'name': name})
    });
    return data
}

export {authorization, registration, logout, getUser, fetchWithRefresh, forgotPassword, resetPassword, changeUser}