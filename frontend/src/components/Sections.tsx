import React from "react";
import styled from "styled-components";
import { ISection } from "../types";
import Lines from "./Lines";

const StyledSection = styled.div`
  background-color: lightcoral;
  padding: 1rem;
  width: 300px;
`
const StyledSections = styled.div`
  background-color: lightblue;
  padding: 1rem;
  height: 600px;
  display: flex;
  justify-content: center;
`

interface SectionsProps {
  sections?: ISection[];
}

const Sections = ({sections}: SectionsProps) => {
  return (
    <StyledSections>
      {sections?.map(({title, description, lines}) => (
        <StyledSection>
          <p>{title}</p>
          <p>{description}</p>
          <Lines lines={lines}/>
        </StyledSection>
      ))}
    </StyledSections>
  );
}

export default Sections;
