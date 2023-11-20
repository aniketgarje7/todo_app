import React, { useState } from "react";
import { publicApiCall } from "../../lib/apiCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogIn = ({ setAuthToggle }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      return;
    }
    if (isLoading) {
      return;
    }
    const API = process.env.REACT_APP_API;
    const url = `${API}user/login`;
    const method = "POST";
    const body = { username: username, password: password };
    setIsLoading(true);
    const response = await publicApiCall(url, method, body);
    if (!response.data) {
      toast.error(response.message);
      return;
    }
    const { token } = response.data;
    localStorage.setItem("list_token", token);
    setIsLoading(false);
    navigate("/");
  };
  return (
    <form onSubmit={handleLogin} className="login">
      <div className="field">
        <input type="text" placeholder="Username" required onChange={(e) => setUserName(e.target.value)} value={username} />
      </div>
      <div className="field">
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>
      <div className="pass-link">
        <a href="#">Forgot password?</a>
      </div>
      <div className="field btn">
        <div className="btn-layer"></div>
        <input type="submit" value={isLoading ? "Loading..." : "Login"} />
      </div>
      <div className="signup-link">
        Not a member? <a onClick={() => setAuthToggle(true)}>Signup now</a>
      </div>
    </form>
  );
};

export default LogIn;
