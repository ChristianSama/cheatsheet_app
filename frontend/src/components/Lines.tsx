import { ChangeEvent, useContext } from "react";
import styled from "styled-components";
import { CheatsheetContext } from "../routes/Cheatsheet";
import { ICheatsheet, ILine, ISection } from "../types";

const StyledLine = styled.div`
  background-color: pink;
  display: flex;
`;

interface LinesProps {
  lines?: ILine[];
}

type LineKey = "description" | "snippet";

const Lines = ({ lines }: LinesProps) => {
  const { cheatsheet, setCheatsheet } = useContext(CheatsheetContext);

  const handleAddLine = () => {};

  const handleSave = () => {};

  const handleLineChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setCheatsheet((prev: ICheatsheet) => {
      prev.sections!.reduce((acc: ILine[], cur: ISection) => {
        return acc.concat(cur.lines!);
      }, [])[index][event.target.className as LineKey] = event.target.value;
      return {
        ...prev,
      };
    });
  };

  return (
    <div className="lines">
      {lines?.map(({ description, snippet }, index) => (
        <StyledLine key={index}>
          <input
            className="description"
            type="text"
            value={description}
            onChange={(event) => handleLineChange(event, index)}
          ></input>
          <input
            className="snippet"
            type="text"
            value={snippet}
            onChange={(event) => handleLineChange(event, index)}
          ></input>
        </StyledLine>
      ))}
      <button onClick={handleAddLine}>Add Line</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Lines;
