import produce from "immer";
import { useContext } from "react";
import styled from "styled-components";
import { CheatsheetContext } from "../pages/Cheatsheet";
import { ILine } from "../types";
import { AuthContext } from "../Utils/AuthProvider";
import Line from "./Line";

interface LinesProps {
  lines?: ILine[];
  sectionIndex: number;
}

const StyledLines = styled.div`
  display: flex;
  flex-direction: column;
`

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
    <StyledLines>
      {lines?.map((line, index) => (
        <Line
          line={line}
          sectionIndex={sectionIndex}
          index={index}
          key={`${line.id}_${index}`}
        />
      ))}
      {auth.user.user_id === cheatsheet.user.id && (
        <button onClick={handleAddLine}>Add Line</button>
      )}
    </StyledLines>
  );
};

export default Lines;
