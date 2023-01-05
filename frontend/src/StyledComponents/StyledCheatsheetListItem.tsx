import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledCheatsheetListItem = styled(Link)`
  color: #1a1a1a;
  background-color: #ffffff;
  border: 1px solid #cecece;
  border-radius: 5px;
  padding: 1rem 2rem;
  text-decoration: none;
  .title {
    font-size: 1.5rem;
  }
  .author {
    color: #6e6e6e;
  }
  &:hover {
    background-color: #e8e8e8;
  }
`

export default StyledCheatsheetListItem