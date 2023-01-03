import produce from "immer";
import React, { ChangeEvent, useContext } from "react";
import styled from "styled-components";
import { CheatsheetContext } from "../pages/Cheatsheet";
import { ILine } from "../types";
import { AuthContext } from "../Utils/AuthProvider";
import Lines from "./Lines";

type SectionKeys = "description" | "title";

interface SectionProps {
  title: string;
  description: string;
  lines: ILine[];
  index: number;
}

const StyledSection = styled.div`
  background-color: white;
  border: 1px solid #cecece;
  border-radius: 5px;
  padding: 1rem;
  width: 300px;
  input {
    display: block;
    width: 100%;
  }
`;

const Section = ({ title, description, lines, index }: SectionProps) => {
  const { cheatsheet, setCheatsheet } = useContext(CheatsheetContext);
  const auth = useContext(AuthContext);

  const handleRemoveSection = (index: number) => {
    setCheatsheet(
      produce((draft) => {
        draft.sections?.splice(index, 1);
      })
    );
  };

  const handleSectionChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setCheatsheet(
      produce((draft) => {
        draft.sections![index][event.target.className as SectionKeys] =
          event.target.value;
      })
    );
  };

  return (
    <StyledSection>
      {auth.user.user_id === cheatsheet.user.id ? (
        <>
          <button onClick={() => handleRemoveSection(index)}>
            Remove Section
          </button>
          <input
            className="title"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(event) => {
              handleSectionChange(event, index);
            }}
          />
          <input
            className="description"
            type="text"
            value={description}
            placeholder="Description"
            onChange={(event) => {
              handleSectionChange(event, index);
            }}
          />
        </>
      ) : (
        <>
          <p>{title}</p>
          <p>{description}</p>
        </>
      )}
      <Lines lines={lines} sectionIndex={index} />
    </StyledSection>
  );
};

export default Section;
