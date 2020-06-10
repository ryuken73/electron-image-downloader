import React from 'react';
import Box from '@material-ui/core/Box';
import deepPurple from '@material-ui/core/colors/deepPurple';
import brown from '@material-ui/core/colors/brown';

const defaultProps = {
    bgcolor: deepPurple[900],
    borderColor: 'black',
    m: "3px",
    border: 1,
    boxSizing: 'border-box',
    minWidth: 'fit-content',
    boxShadow: 0
  };
  

export default function BorderedBox(props) {
    const combinedProps = {
        ...defaultProps,
        ...props
    }
    // console.log(combinedProps);
    return (
        <Box
            className="BorderedBox"
            {...combinedProps}
        >
        </Box>
    )
}
