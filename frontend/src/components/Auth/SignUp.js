import React, { useState } from "react";
import { toast } from "react-toastify";
import { publicApiCall } from "../../lib/apiCall";

const SignUp = ({ setAuthToggle }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setFormDataDefault = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (username === "" || password === "" || confirmPassword === "" || email === "") {
      return;
    }
    const API = process.env.REACT_APP_API;
    const url = `${API}user/signin`;
    const method = "POST";
    const body = { name: username, username: username, email: email, password: password, confirm_password: confirmPassword };
    const response = await publicApiCall(url, method, body);
    if (!response?.data) {
      toast.error(response?.error?.message);
      return;
    }
    toast.success(response.message);
    setAuthToggle(false);
    setFormDataDefault();
  };
  return (
    <form onSubmit={handleSignUp} className="signup">
      <div className="field">
        <input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>
      <div className="field">
        <input type="text" placeholder="Email Address" required onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>
      <div className="field">
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>
      <div className="field">
        <input type="password" placeholder="Confirm password" required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
      </div>
      <div className="field btn">
        <div className="btn-layer"></div>
        <input type="submit" value="Signup" />
      </div>
      <div className="signup-link">
        already a member? <a onClick={() => setAuthToggle(false)}>login now</a>
      </div>
    </form>
  );
};

export default SignUp;
