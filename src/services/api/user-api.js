import { print } from "../../utils/utils"
const baseUrl = "https://norma.nomoreparties.space/api/"
const authorization = async (email, password)=>{
    print(password)
    const endPointUrl = "auth/login "
    const response = await fetch(baseUrl.concat(endPointUrl),{
        
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'email':email, 'password': password})
    });
    if (!response.ok){
        throw new Error(`user-api.authorization: response.code=${response.code}`)
    }
    const data = await response.json()
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
    if (!response.ok){
        throw new Error(`user-api.registration: response.code=${response.code}`)
    }
    const data = await response.json()    
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
    if (!response.ok){
        throw new Error(`user-api.forgotPassword: response.code=${response.code}`)
    }
    const data = await response.json()    
    return data
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
    if (!response.ok){
        throw new Error(`user-api.resetPassword: response.code=${response.code}`)
    }
    const data = await response.json()    
    return data
}

const refreshToken = async ()=>{
    const endPointUrl = "auth/token"
    const response = await fetch(baseUrl.concat(endPointUrl),{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({'token': localStorage.getItem("refreshToken")})
    });
    
    const refreshData = checkReponse(response)
    if (!refreshData.success) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshData);
      }
    localStorage.setItem("refreshToken", refreshData.refreshToken); 
    localStorage.setItem("accessToken", refreshData.accessToken);
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
    if (!response.ok){
        throw new Error(`user-api.logout: response.code=${response.code}`)
    }
    const data = await response.json()    
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    return data
}

const checkReponse = async (res) => {
    return res.ok ? await res.json() : await res.json().then((err) => Promise.reject(err));
  };
  

const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await checkReponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); 
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); 
        return await checkReponse(res);
      } else {
            return Promise.reject(err);
      }
    }
  };

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