import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Utils/AuthProvider";

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>Navbar</li>
        <li>
          <AuthStatus />
        </li>
      </ul>
    </div>
  );
};

const AuthStatus = () => {
  let auth = useContext(AuthContext);
  let navigate = useNavigate();

  if (!auth.user) {
    return (
      <>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </>
    );
  }

  return (
    <div>
      <p>Welcome {auth.user.username}!</p>
      <button
        onClick={() => {
          auth.logout(() => navigate("/"));
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
