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
  background-color: lightcoral;
  padding: 1rem;
  width: 300px;
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
      {auth.user.userId === cheatsheet.user ? (
        <>
          <button onClick={() => handleRemoveSection(index)}>
            Remove Section
          </button>
          <input
            className="title"
            type="text"
            value={title}
            onChange={(event) => {
              handleSectionChange(event, index);
            }}
          />
          <input
            className="description"
            type="text"
            value={description}
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
