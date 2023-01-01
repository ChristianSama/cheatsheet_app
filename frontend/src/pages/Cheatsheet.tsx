import produce from "immer";
import React, { ChangeEvent, createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sections from "../components/Sections";
import { ICheatsheet } from "../types";
import { AuthContext } from "../Utils/AuthProvider";

export interface ICheatsheetContext {
  cheatsheet: ICheatsheet;
  setCheatsheet: React.Dispatch<React.SetStateAction<ICheatsheet>>;
}

export const CheatsheetContext = createContext<ICheatsheetContext>({
  cheatsheet: {},
  setCheatsheet: () => {},
});

type CheatsheetKey = "description" | "title";

export const Cheatsheet = () => {
  const [error, setError] = useState<null | Error>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cheatsheet, setCheatsheet] = useState<ICheatsheet>({});
  const params = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}cheatsheets/${params.id}/`)
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

  const handleSave = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.authTokens.access}`,
      },
      body: JSON.stringify(cheatsheet),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}cheatsheets/${cheatsheet.id}/`,
        options
      );
      if (response.ok) {
        console.log("Cambio guardado exitosamente");
      }
      if (response.status === 401) {
        //Unauthorized
        auth.logout(() => navigate(cheatsheet.id!.toString()));
      }
    } catch (err) {
      setError(err as Error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheatsheet(
      produce((draft) => {
        if (event.target.className === "tags") {
          draft.tags = event.target.value.replace(/ /g, "").split(",");
        } else {
          draft[event.target.className as CheatsheetKey] = event.target.value;
        }
      })
    );
  };

  const handleUpvote = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.authTokens.access}`,
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}cheatsheets/${cheatsheet.id}/vote/`,
        options
      );
      if (response.ok) {
        alert("operacion exitosa");
      }
      if (response.status === 409) {
        alert("no puedes votar mas de una vez")
      }
    } catch (err) {
      alert("algo salio mal");
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="cheatsheet">
        <p>{cheatsheet.vote_score}</p>
        <button onClick={handleUpvote}>Upvote</button>
        {auth.user.user_id === cheatsheet.user ? (
          <>
            <button onClick={handleSave}>Save</button>
            <input
              className="title"
              type="text"
              value={cheatsheet.title}
              onChange={(event) => handleChange(event)}
            />
            <input
              className="description"
              placeholder="description"
              type="text"
              value={cheatsheet.description}
              onChange={(event) => handleChange(event)}
            />
            <input
              className="tags"
              type="text"
              placeholder="tags"
              value={cheatsheet.tags!.join()}
              onChange={(event) => handleChange(event)}
            />
          </>
        ) : (
          <>
            <p>{cheatsheet.title}</p>
            <p>{cheatsheet.description}</p>
            <p>{cheatsheet.tags!.join()}</p>
          </>
        )}
        <CheatsheetContext.Provider value={{ cheatsheet, setCheatsheet }}>
          <Sections sections={cheatsheet.sections} />
        </CheatsheetContext.Provider>
      </div>
    );
  }
};
