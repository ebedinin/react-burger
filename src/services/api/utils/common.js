

const baseUrl = "https://norma.nomoreparties.space/api/"

const checkReponse = async (res) => {
    return res.ok ? await res.json() : await res.json().then((err) => Promise.reject(err));
  };

  
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
    console.log(refreshData)
    if (!refreshData.success) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshData);
      }
    localStorage.setItem("refreshToken", refreshData.refreshToken); 
    localStorage.setItem("accessToken", refreshData.accessToken);
}

  
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

  export {checkReponse, fetchWithRefresh, baseUrl} 