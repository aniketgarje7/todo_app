import "./App.css";
import ListBar from "./components/ListBar";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { authApiCall } from "./lib/apiCall";

function Home() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    const API = process.env.REACT_APP_API;
    const url = `${API}user/get`;
    const method = "GET";
    const data = {};
    const response = await authApiCall(url, method);
    if (!response?.data) {
      console.log(response, "error");
      return;
    }
    setUser(response.data.user);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="Home">
      <div>
        <Navbar user={user} />
      </div>
      <div>
        <ListBar user={user} />
      </div>
    </div>
  );
}

export default Home;
