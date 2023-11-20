import { AuthHeader, PublicHeader } from "./headers";

const publicApiCall = async (url,method,data)=>{
    const bodyData = data?data:{};
    const requestOptions = {
        method: method,
        headers: PublicHeader(),
        body: JSON.stringify(bodyData),
      };
    return fetch(url,requestOptions)
    .then((res)=>res.json())
    .then((data)=>data)
    .catch((e)=>console.log(e.message,'error in fetch'))
}

const authApiCall = async (url,method,data)=>{
    const requestOptions = method==='GET'?{
      method: method,
      headers: AuthHeader(),
    }:{
        method: method,
        headers: AuthHeader(),
        body: JSON.stringify(data),
      };
    return fetch(url,requestOptions)
    .then((res)=>res.json())
    .then((data)=>data)
    .catch((e)=>console.log(e.message,'error in fetch'))
}
export {publicApiCall,authApiCall}