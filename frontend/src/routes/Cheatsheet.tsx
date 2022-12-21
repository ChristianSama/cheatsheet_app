import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICheatsheet } from "../types";

export const Cheatsheet = () => {
  const [error, setError] = useState<null|Error>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cheatsheet, setCheatsheet] = useState<ICheatsheet>({});
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/cheatsheets/${params.id}/`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCheatsheet(result);
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
      <div className="cheatsheet">
        <p>{cheatsheet.title}</p>
        <p>{cheatsheet.description}</p>
      </div>
    );
  }
}