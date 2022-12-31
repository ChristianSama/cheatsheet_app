import produce from "immer";
import { ChangeEvent, useContext } from "react";
import styled from "styled-components";
import { CheatsheetContext } from "../pages/Cheatsheet";
import { ILine } from "../types";
import { AuthContext } from "../Utils/AuthProvider";

type LineKey = "description" | "snippet";

const StyledLine = styled.div`
  background-color: pink;
  display: flex;
`;

interface LineProps {
  line: ILine;
  index: number;
  sectionIndex: number;
}

const Line = ({ line, index, sectionIndex }: LineProps) => {
  const { cheatsheet, setCheatsheet } = useContext(CheatsheetContext);
  const auth = useContext(AuthContext);

  const handleRemove = (index: number) => {
    setCheatsheet(
      produce((draft) => {
        draft.sections![sectionIndex].lines?.splice(index, 1);
      })
    );
  };

  const handleLineChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setCheatsheet(
      produce((draft) => {
        draft.sections![sectionIndex].lines![index][
          event.target.className as LineKey
        ] = event.target.value;
      })
    );
  };

  return (
    <div>
      <StyledLine key={`${line.id}_${index}`}>
        {auth.user.userId === cheatsheet.user ? (
          <>
            <input
              className="description"
              type="text"
              value={line.description}
              onChange={(event) => handleLineChange(event, index)}
            ></input>
            <input
              className="snippet"
              type="text"
              value={line.snippet}
              onChange={(event) => handleLineChange(event, index)}
            ></input>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </>
        ) : (
          <>
            <p>{line.description}</p>
            <p>{line.snippet}</p>
          </>
        )}
      </StyledLine>
    </div>
  );
};

export default Line;
