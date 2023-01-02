import styled from "styled-components"

const StyledButton = styled.button`
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  border: 1px solid grey;
  padding: 1em 1em;
  &:hover {
    background-color: grey;
    color: white;
  }
`

export default StyledButton