import React, { ChangeEvent, useContext } from "react";
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
  justify-content: center;
`;

interface SectionsProps {
  sections?: ISection[];
}

type SectionKeys = "description" | "title";

const Sections = ({ sections }: SectionsProps) => {
  const { cheatsheet, setCheatsheet } = useContext(CheatsheetContext);

  const handleSectionChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setCheatsheet((prev: ICheatsheet) => {
      prev.sections![index][event.target.className as SectionKeys] =
        event.target.value;
      return {
        ...prev,
      };
    });
  };

  return (
    <StyledSections>
      {sections?.map(({ title, description, lines }, index) => (
        <StyledSection key={index}>
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
          <Lines lines={lines} />
        </StyledSection>
      ))}
    </StyledSections>
  );
};

export default Sections;
