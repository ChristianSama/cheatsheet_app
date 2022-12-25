import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sections from "../components/Sections";
import { ICheatsheet } from "../types";

export interface ICheatsheetContext {
  cheatsheet: ICheatsheet;
  setCheatsheet: React.Dispatch<React.SetStateAction<ICheatsheet>>;
}

export const CheatsheetContext = createContext<ICheatsheetContext>({
  cheatsheet: {},
  setCheatsheet: () => {},
});

export const Cheatsheet = () => {
  const [error, setError] = useState<null | Error>(null);
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
        <CheatsheetContext.Provider value={{ cheatsheet, setCheatsheet }}>
          <Sections sections={cheatsheet.sections} />
        </CheatsheetContext.Provider>
      </div>
    );
  }
};
