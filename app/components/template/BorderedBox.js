import React from 'react';
import Box from '@material-ui/core/Box';

const defaultProps = {
    bgcolor: 'lightgrey',
    borderColor: 'black',
    m: "3px",
    border: 1,
    boxSizing: 'border-box',
    minWidth: 'fit-content',
    boxShadow: 0
  };
  

export default function BorderedBox(props) {
    return (
        <Box
            className="BorderedBox"
            {...defaultProps}
            {...props}
        >
        </Box>
    )
}
