import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../Utils/AuthProvider";
import StyledButton from "../StyledComponents/StyledButton";
import { ICheatsheet } from "../types";

const StyledNavbar = styled.nav`
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
        tags: [],
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
        <StyledButton onClick={() => navigate("/login")}>Login</StyledButton>
        <StyledButton onClick={() => navigate("/register")}>Register</StyledButton>
      </StyledAuthStatus>
    );
  }

  return (
    <StyledAuthStatus>
      <StyledButton onClick={handleCreateCheatsheet}>Nueva Cheatsheet</StyledButton>
      <p>Welcome {auth.user.username}!</p>
      <StyledButton
        onClick={() => {
          auth.logout(() => navigate("/"));
        }}
      >
        Logout
      </StyledButton>
    </StyledAuthStatus>
  );
};

export default Navbar;
