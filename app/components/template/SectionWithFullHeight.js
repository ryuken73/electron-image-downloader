import React from 'react'
import Box from '@material-ui/core/Box';
import BorderdBox from './BorderedBox';

const defaultProps = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    boxSizing: 'border-box', 
    overflow: 'auto',
    minWidth: 'fit-content'
}

export default function SectionWithBorder({children, ...props}) {
    return (
        <Box className="SectionWithFullHeight" {...defaultProps} {...props}>
            {/* <BorderdBox className="SectionWithFullHeight BorderdBox" flex="1" flexShrink={0}> */}
                {children}
            {/* </BorderdBox> */}
        </Box>
    )
}
