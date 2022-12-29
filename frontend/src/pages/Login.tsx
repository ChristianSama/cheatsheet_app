import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Utils/AuthProvider';

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useContext(AuthContext);

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    //TODO: hash password
    const password = formData.get("password") as string;

    const user = {username, password}

    auth.login(user, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
          Password: <input name="password" type="password" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login