const AuthHeader  = ()=>{
    const token = localStorage.getItem("list_token");
    const userHeader = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "x-list": `${token}`,
    };
    return userHeader;
}
const PublicHeader = ()=>{
    const userHeader = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    return userHeader;
}
export {AuthHeader,PublicHeader};