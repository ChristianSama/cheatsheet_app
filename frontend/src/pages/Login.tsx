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
    let username = formData.get("username") as string;

    auth.signin(username, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login