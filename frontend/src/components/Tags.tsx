import produce from "immer";
import React, { ChangeEvent, useContext } from "react";
import styled from "styled-components";
import { CheatsheetContext } from "../pages/Cheatsheet";
import { AuthContext } from "../Utils/AuthProvider";

const StyledTags = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  span {
    background-color: white;
    padding: 0.5rem;
  }
`

const Tags = () => {
  const auth = useContext(AuthContext);
  const { cheatsheet, setCheatsheet } = useContext(CheatsheetContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheatsheet(
      produce((draft) => {
        draft.tags = event.target.value.replace(/ /g, "").split(",");
      })
    );
  };

  if (auth.user.user_id === cheatsheet.user.id) {
    return (
      <StyledTags>
        <input
          className="tags"
          type="text"
          placeholder="tags"
          value={cheatsheet.tags!.join()}
          onChange={(event) => handleChange(event)}
        />
      </StyledTags>
    );
  }

  return (
    <StyledTags>
      {cheatsheet.tags?.map((tag, index) => (
        <span className="tags" key={index}>{tag}</span>
      ))}
    </StyledTags>
  )
};

export default Tags;
