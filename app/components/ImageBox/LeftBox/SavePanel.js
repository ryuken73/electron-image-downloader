import React from 'react';
import Box from '@material-ui/core/Box';
import BorderedBox from '../../template/BorderedBox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SectionWithFullHeightFlex from '../../template/SectionWithFullHeightFlex';

const { dialog } = require('electron').remote;
const path = require('path');

export default function SavePanel(props) {
    console.log('######################## re-render SavePenel', props)
    const {deleteAfterSave, saveDirectory, pageSaveDirectory, currentTab, pageTitles} = props;
    const {setPageSaveDirectory, deleteFilesSelected, saveFilesSelected} = props.SavePanelAction;
    const {setAllImageCheck} = props.ImageListAction;
    console.log(saveDirectory, pageSaveDirectory);

    React.useEffect(() => {
        const tabTitle = pageTitles.get(currentTab) || '';
        const tabTitleForPath = tabTitle.replace(/[\\/:*?\"<>|]/g,"") || '';
        console.log(saveDirectory, tabTitleForPath)
        const newDirectory = path.join(saveDirectory, tabTitleForPath);
        setPageSaveDirectory(newDirectory);
    }, [pageTitles, currentTab])

    const onSaveDirectoryChange = (event) => {
        setPageSaveDirectory(event.target.value)
    }

    const onClickSelectSaveDirectory = () => {
        dialog.showOpenDialog(({properties:['openDirectory']}), filePaths=> {
          if(filePaths === undefined) return;
          setPageSaveDirectory(filePaths[0]);      
        })
    };
    
    const onClickSetAllChecked = (event) => {
        setAllImageCheck(true);
    }

    const onClickSavelAllChecked = event => {
        saveFilesSelected();
    }

    return (
        <SectionWithFullHeightFlex className="SectionWithFullHeightFlex ImageBox" flexGrow="0" width="20px" >
            <BorderedBox display="flex" alignContent="center" flexGrow="1">
                <Box display="flex" flexDirection="column" width="1" textAlign={"center"}>
                    <Box mt="20px" display="flex" height="120px" justifyContent="space-around" flexShrink="0" flexDirection="column" mx="10px" mb="10px">
                        <Typography variant={"body1"}>Save Directory</Typography>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                value={pageSaveDirectory}
                                onChange={onSaveDirectoryChange}
                            ></TextField>
                        <Button variant={"contained"} onClick={onClickSelectSaveDirectory}>Choose</Button>
                    </Box>
                    <Box mt="20px" display="flex" height="80px" justifyContent="space-around" flexShrink="0" flexDirection="column" mx="10px" mb="10px">
                        <Typography variant={"body1"}>File Name Prefix</Typography>
                        <TextField 
                            variant="outlined"
                            margin="dense"
                        ></TextField>
                    </Box>
                    <Box mt="auto" display="flex" height="150px" justifyContent="space-around" flexShrink="0" flexDirection="column" mx="10px" mb="30px">
                        <Button variant={"contained"} onClick={onClickSetAllChecked}>Select All</Button>
                        <Button variant={"contained"} onClick={onClickSavelAllChecked}>Save Selected</Button>
                        <Button variant={"contained"} onClick={deleteFilesSelected}>Delete Selected</Button>
                    </Box>            
                </Box>
            </BorderedBox>
        </SectionWithFullHeightFlex>
    )
}
