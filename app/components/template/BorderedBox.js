import React from 'react';
import Box from '@material-ui/core/Box';

const defaultProps = {
    bgcolor: 'lightgrey',
    borderColor: 'black',
    m: "5px",
    border: 1,
    boxSizing: 'border-box',
    minWidth: 'fit-content'
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
