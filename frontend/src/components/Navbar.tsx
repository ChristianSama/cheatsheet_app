import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../Utils/AuthProvider";
import { ICheatsheet } from "../types";
import StyledNavButton from "../StyledComponents/StyledNavButton";

const StyledNavbar = styled.nav`
  background-color: white;
  li {
    list-style: none;
  }
  ul {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const StyledAuthStatus = styled.div`
  display: flex;
  gap: 2rem;
  margin: 0px 10px;
`

const Navbar = () => {
  return (
    <StyledNavbar>
      <ul>
        <li><Link to="/">Cheatsheet App</Link></li>
        <li>
          <AuthStatus />
        </li>
      </ul>
    </StyledNavbar>
  );
};

const AuthStatus = () => {
  let auth = useContext(AuthContext);
  let navigate = useNavigate();

  const handleCreateCheatsheet = async () => {
    console.log(auth.user)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.authTokens.access}`,
      },
      body: JSON.stringify({
        title: "Nueva Cheatsheet",
        description: "",
        user: auth.user.user_id,
      }),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}cheatsheets/`,
        options
      );
      const cs = (await response.json()) as ICheatsheet;
      if (response.ok) {
        console.log("Cheatsheet creada exitosamente");
        navigate(`cheatsheets/${cs.id!}`);
      }
      if (response.status === 401) {
        //Unauthorized
        auth.logout(() => navigate("/"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!auth.user) {
    return (
      <StyledAuthStatus>
        <StyledNavButton onClick={() => navigate("/login")}>Login</StyledNavButton>
        <StyledNavButton onClick={() => navigate("/register")}>Register</StyledNavButton>
      </StyledAuthStatus>
    );
  }

  return (
    <StyledAuthStatus>
      <StyledNavButton onClick={handleCreateCheatsheet}>Crear Nueva Cheatsheet</StyledNavButton>
      <p>Welcome {auth.user.username}!</p>
      <StyledNavButton
        onClick={() => {
          auth.logout(() => navigate("/"));
        }}
      >
        Logout
      </StyledNavButton>
    </StyledAuthStatus>
  );
};

export default Navbar;
