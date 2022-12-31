import produce from "immer";
import { ChangeEvent, useContext, useState } from "react";
import { CheatsheetContext } from "../pages/Cheatsheet";
import { ICheatsheet, ILine, ISection } from "../types";
import { AuthContext } from "../Utils/AuthProvider";
import Line from "./Line";

interface LinesProps {
  lines?: ILine[];
  sectionIndex: number;
}

const Lines = ({ lines, sectionIndex }: LinesProps) => {
  const { cheatsheet, setCheatsheet } = useContext(CheatsheetContext);
  const auth = useContext(AuthContext);

  const newLine = {
    description: "",
    snippet: "",
  };

  const handleAddLine = () => {
    setCheatsheet(
      produce((draft) => {
        draft.sections![sectionIndex].lines?.push(newLine);
      })
    );
  };

  return (
    <div className="lines">
      {lines?.map((line, index) => (
        <Line line={line} sectionIndex={sectionIndex} index={index} />
      ))}
      {auth.user.userId === cheatsheet.user && (
        <button onClick={handleAddLine}>Add Line</button>
      )}
    </div>
  );
};

export default Lines;
