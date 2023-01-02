import { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import StyledButton from "../StyledComponents/StyledButton";
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
