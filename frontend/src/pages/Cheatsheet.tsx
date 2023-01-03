import produce from "immer";
import React, { ChangeEvent, createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sections from "../components/Sections";
import Tags from "../components/Tags";
import StyledCheatsheet from "../StyledComponents/StyledCheatsheet";
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
    const outputCheatsheet = {...cheatsheet}
    outputCheatsheet.user = auth.user.id

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.authTokens.access}`,
      },
      body: JSON.stringify(outputCheatsheet),
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
        draft[event.target.className as CheatsheetKey] = event.target.value;
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
        alert("no puedes votar mas de una vez");
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
      <StyledCheatsheet>
        <CheatsheetContext.Provider value={{ cheatsheet, setCheatsheet }}>
            {auth.user.user_id === cheatsheet.user.id ? (
              <div>
                <button onClick={handleSave}>Save</button>
                <div className="header">
                  <span>{cheatsheet.vote_score}</span>
                  <button onClick={handleUpvote}>Upvote</button>
                  <input
                    className="title"
                    type="text"
                    value={cheatsheet.title}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <input
                  className="description"
                  placeholder="description"
                  type="text"
                  value={cheatsheet.description}
                  onChange={(event) => handleChange(event)}
                />
              </div>
            ) : (
              <div>
                <div className="header">
                  <span>{cheatsheet.vote_score}</span>
                  <button onClick={handleUpvote}>Upvote</button>
                  <p className="title">{cheatsheet.title}</p>
                </div>
                <p className="description">{cheatsheet.description}</p>
              </div>
            )}
          <Tags />
          <Sections sections={cheatsheet.sections} />
        </CheatsheetContext.Provider>
      </StyledCheatsheet>
    );
  }
};
