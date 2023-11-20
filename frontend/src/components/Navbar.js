import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("list_token");
    navigate("/auth");
  };
  return (
    <div>
      <div className="navbar_div">
        <ul className="navbar_ul">
          <li>
            welcome <span>{user?.username}</span>
          </li>
          <li onClick={handleLogout} className="logout_button">
            logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
