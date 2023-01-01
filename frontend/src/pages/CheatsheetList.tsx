import { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { ICheatsheet } from "../types";
import { AuthContext } from "../Utils/AuthProvider";

export const CheatsheetList = () => {
  const [error, setError] = useState<null | Error>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cheatsheets, setCheatsheets] = useState<ICheatsheet[]>([]);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:8000/api/cheatsheets/")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCheatsheets(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

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
        user: auth.user.userId,
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
        navigate(`${cs.id!}`);
      }
      if (response.status === 401) {
        //Unauthorized
        auth.logout(() => navigate("/"));
      }
    } catch (err) {
      setError(err as Error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {auth.user && (
          <button onClick={handleCreateCheatsheet}>Nueva Cheatsheet</button>
        )}
        <ul>
          {cheatsheets.map((cs) => (
            <li key={cs.id}>
              <Link to={`${cs.id}`}>
                <p>{cs.title}</p>
                <p>{cs.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
