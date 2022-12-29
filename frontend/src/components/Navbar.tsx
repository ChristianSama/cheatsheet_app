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
      </>
    );
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
};

export default Navbar;
