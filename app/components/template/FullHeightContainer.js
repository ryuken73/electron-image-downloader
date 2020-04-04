import React from 'react'
import Box from '@material-ui/core/Box';

const defaultProps = {
    display: "flex",
    height: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    // flexShrink: 0
}

export default function FullHeightContainer({children, ...props}) {
    return (
        <Box className="FullHeightContainer" {...defaultProps} {...props}>
            {children}
        </Box>

    )
}
