import React from "react";
import { ISection } from "../types";
import Lines from "./Lines";

interface SectionsProps {
  sections?: ISection[];
}

const Sections = ({sections}: SectionsProps) => {
  return (
    <div className="sections">
      {sections?.map(({title, description, lines}) => (
        <div>
          <p>{title}</p>
          <p>{description}</p>
          <Lines lines={lines}/>
        </div>
      ))}
    </div>
  );
}

export default Sections;
