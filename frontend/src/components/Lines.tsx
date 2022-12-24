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

const Lines = ({ lines }: LinesProps) => {
  const { cheatsheet, setCheatsheet } = useContext(CheatsheetContext);

  const handleAddLine = () => {};

  const handleSave = () => {};

  const handleDescriptionChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: number | undefined
  ) => {
    setCheatsheet((prev: ICheatsheet) => {
      prev
        .sections!.reduce((acc: ILine[], cur: ISection) => {
          return acc.concat(cur.lines!);
        }, [])
        .find((line) => line.id === id)!.description = event.target.value;
      return {
        ...prev,
      };
    });
  };

  const handleSnippetChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: number | undefined
  ) => {};

  return (
    <div className="lines">
      {lines?.map(({ id, description, snippet }, index) => (
        <StyledLine key={id}>
          <input
            type="text"
            value={description}
            onChange={(event) => handleDescriptionChange(event, id)}
          ></input>
          <input
            type="text"
            value={snippet}
            onChange={(event) => handleSnippetChange(event, id)}
          ></input>
        </StyledLine>
      ))}
      <button onClick={handleAddLine}>Add Line</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Lines;
