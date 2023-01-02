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

  type Headers = {
    [key: string]: string;
  } 

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      } as Headers,
    };

    if (auth.authTokens) {
      options.headers.Authorization = `Bearer ${auth.authTokens.access}`;
    }

    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8000/api/cheatsheets/",
        options
      );
      if (response.status === 401) {
        //Unauthorized
        auth.logout(() => navigate("/login"));
      }
      const result = await response.json();
      setIsLoaded(true);
      setCheatsheets(result);
    };

    fetchData().catch((err) => setError(err));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
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
