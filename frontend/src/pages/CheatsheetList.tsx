import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { ICheatsheet } from "../types";

export const CheatsheetList = () => {
  const [error, setError] = useState<null | Error>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cheatsheets, setCheatsheets] = useState<ICheatsheet[]>([]);
  const navigate = useNavigate();

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({title: ""}),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}cheatsheets/`,
        options,
      );
      const cs = await response.json() as ICheatsheet;
      navigate(`cheatsheets/${cs.id!}`);
    } catch(err) {
      setError(err as Error)
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <button onClick={handleCreateCheatsheet}>Nueva Cheatsheet</button>
        <ul>
          {cheatsheets.map((cs) => (
            <li key={cs.id}>
              <Link to={`cheatsheets/${cs.id}`}>
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
