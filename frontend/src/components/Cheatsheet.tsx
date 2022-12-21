import { useEffect, useState } from "react";
import { ICheatsheet } from "../types";

export const CheatsheetList = () => {
  const [error, setError] = useState<null|Error>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cheatsheets, setCheatsheets] = useState<ICheatsheet[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/cheatsheets/")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCheatsheets(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
      <ul>
        {cheatsheets.map(cs => (
          <li key={cs.id}>
            {cs.title} {cs.description}
          </li>
        ))}
      </ul>
    );
  }
};
