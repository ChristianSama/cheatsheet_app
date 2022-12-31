import produce from "immer";
import React, { ChangeEvent, useContext, useState } from "react";
import styled from "styled-components";
import { CheatsheetContext } from "../pages/Cheatsheet";
import { ICheatsheet, ISection } from "../types";
import { AuthContext } from "../Utils/AuthProvider";
import Section from "./Section";

const StyledSections = styled.div`
  background-color: lightblue;
  padding: 1rem;
  height: 600px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

interface SectionsProps {
  sections?: ISection[];
}

const Sections = ({ sections }: SectionsProps) => {
  const { cheatsheet, setCheatsheet } = useContext(CheatsheetContext);
  const auth = useContext(AuthContext);

  const newSection = {
    description: "",
    title: "",
    lines: [],
  };

  const handleAddSection = () => {
    setCheatsheet(
      produce((draft) => {
        draft.sections?.push(newSection);
      })
    );
  };

  return (
    <>
      {auth.user.userId === cheatsheet.user && (
        <button onClick={handleAddSection}>Add Section</button>
      )}
      <StyledSections>
        {sections?.map(({ id, title, description, lines }, index) => (
          <Section
            key={`${id}_${index}`}
            title={title!}
            description={description!}
            lines={lines!}
            index={index}
          />
        ))}
      </StyledSections>
    </>
  );
};

export default Sections;
