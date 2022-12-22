import React from 'react';
import styled from 'styled-components';
import { ILine } from '../types';

const StyledLine = styled.div`
  background-color: pink;
  display: flex;
`

const StyledLines = styled.div`
`

interface LinesProps {
  lines?: ILine[];
}

const Lines = ({lines}: LinesProps) => {
  return (
    <div className='lines'>
      {lines?.map(({description, snippet}) => (
        <StyledLine>
          <div>{description}</div>
          <div>{snippet}</div>
        </StyledLine>
      ))}
    </div>
  )
}

export default Lines