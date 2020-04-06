import React from 'react';
import Box from '@material-ui/core/Box';
import BorderedBox from '../../template/BorderedBox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SectionWithFullHeightFlex from '../../template/SectionWithFullHeightFlex';


export default function SavePanel() {
    return (
        <SectionWithFullHeightFlex className="SectionWithFullHeightFlex ImageBox" flexGrow="0" width="20px" >
             <BorderedBox display="flex" alignContent="center" flexGrow="1">
            <Box display="flex" flexDirection="column" width="1" textAlign={"center"}>
                <Box mt="20px" display="flex" height="120px" justifyContent="space-around" flexShrink="0" flexDirection="column" mx="10px" mb="10px">
                    <Typography variant={"body1"}>Save Directory</Typography>
                    <TextField 
                        variant="outlined"
                        margin="dense"
                    ></TextField>
                    <Button variant={"contained"}>Choose</Button>
                </Box>
                <Box mt="20px" display="flex" height="80px" justifyContent="space-around" flexShrink="0" flexDirection="column" mx="10px" mb="10px">
                    <Typography variant={"body1"}>File Name Prefix</Typography>
                    <TextField 
                        variant="outlined"
                        margin="dense"
                    ></TextField>
                </Box>
                <Box mt="auto" display="flex" height="150px" justifyContent="space-around" flexShrink="0" flexDirection="column" mx="10px" mb="30px">
                    <Button variant={"contained"}>Select All</Button>
                    <Button variant={"contained"}>Save Selected</Button>
                    <Button variant={"contained"}>Delete Selected</Button>
                </Box>            
            </Box>
            </BorderedBox>
        </SectionWithFullHeightFlex>
    )
}
