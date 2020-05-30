import React from 'react';
import Box from '@material-ui/core/Box';
import BorderedBox from '../../template/BorderedBox';
import Typography from '@material-ui/core/Typography';
import SectionWithFullHeightFlex from '../../template/SectionWithFullHeightFlex';


export default function MessagePanel(props) {
    console.log('######################## re-render MessagePanel', props);
    const {logLevel, message} = props;
    const messageText = `[${logLevel}] ${message}`;
   return (
        <SectionWithFullHeightFlex className="SectionWithFullHeightFlex ImageBox" flexGrow="0" width="1" mb="2px">
            <BorderedBox display="flex" alignContent="center" flexGrow="1">
                <Box bgcolor="midnightblue" display="flex" flexDirection="row" width="1">
                    <Box mx="10px">
                        <Typography variant={"caption"}>{messageText}</Typography>
                    </Box>
                </Box>
            </BorderedBox>
        </SectionWithFullHeightFlex>
    )
}
