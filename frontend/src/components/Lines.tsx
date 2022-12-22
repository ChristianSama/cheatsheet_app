import React from 'react'
import { ILine } from '../types';

interface LinesProps {
  lines?: ILine[];
}

const Lines = ({lines}: LinesProps) => {
  return (
    <div className='lines'>
      {lines?.map(({description, snippet}) => (
        <div>
          <p>{description}</p>
          <p>{snippet}</p>
        </div>
      ))}
    </div>
  )
}

export default Lines