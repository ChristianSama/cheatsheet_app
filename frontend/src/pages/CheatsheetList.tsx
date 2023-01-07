import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledCheatsheetList from "../StyledComponents/StyledCheatsheetList";
import StyledCheatsheetListItem from "../StyledComponents/StyledCheatsheetListItem";
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
  };

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
        `${process.env.REACT_APP_API_URL}cheatsheets/`,
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
  }, [auth, navigate]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <StyledCheatsheetList>
        {cheatsheets.map((cs) => (
          <StyledCheatsheetListItem key={cs.id} to={`${cs.id}`}>
            <p className="title">{cs.title}</p>
            <p className="description">{cs.description}</p>
            <p className="author">by {cs.user.username}</p>
          </StyledCheatsheetListItem>
        ))}
      </StyledCheatsheetList>
    );
  }
};
