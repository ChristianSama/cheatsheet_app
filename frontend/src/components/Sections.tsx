import produce from "immer";
import React, { ChangeEvent, useContext, useState } from "react";
import styled from "styled-components";
import { CheatsheetContext } from "../routes/Cheatsheet";
import { ICheatsheet, ISection } from "../types";
import Lines from "./Lines";

const StyledSection = styled.div`
  background-color: lightcoral;
  padding: 1rem;
  width: 300px;
`;
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

type SectionKeys = "description" | "title";

const Sections = ({ sections }: SectionsProps) => {
  const { cheatsheet, setCheatsheet } = useContext(CheatsheetContext);
  const [error, setError] = useState<Error>();

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

  const handleRemoveSection = (index: number) => {
    setCheatsheet(
      produce((draft) => {
        draft.sections?.splice(index, 1);
      })
    );
  };

  const handleSave = async () => {
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cheatsheet),
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}cheatsheets/${cheatsheet.id}/`,
        options
      );
      const content = await response.json();
      console.log(content);
    } catch (err) {
      setError(err as Error)
    }
  };

  return (
    <>
      <button onClick={handleAddSection}>Add Section</button>
      <button onClick={handleSave}>Save</button>
      <StyledSections>
        {sections?.map(({ id, title, description, lines }, index) => (
          <StyledSection key={`${id}_${index}`}>
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
            <Lines lines={lines} sectionIndex={index} />
            <button onClick={() => handleRemoveSection(index)}>
              Remove Section
            </button>
          </StyledSection>
        ))}
      </StyledSections>
    </>
  );
};

export default Sections;
