import React from 'react';
import Box from '@material-ui/core/Box';
import BorderdBox from './BorderedBox';

const defaultProps = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    boxSizing: 'border-box',
    // width: 1,
    overflow: "auto",
    minWidth: 'fit-content'
}

export default function FirstChildSection({children, ...props}) {
    return (
        <Box className="FirstChildSection" {...defaultProps} {...props}>
            {/* <BorderdBox className="FirstChildSection BorderdBox" display="flex" flexDirection="column" flex={1} flexShrink={0}  > */}
                {children}
            {/* </BorderdBox> */}
        </Box>
    )
}
