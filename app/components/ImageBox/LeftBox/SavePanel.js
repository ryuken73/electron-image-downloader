import React from 'react';
import Box from '@material-ui/core/Box';
import BorderedBox from '../../template/BorderedBox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SectionWithFullHeightFlex from '../../template/SectionWithFullHeightFlex';
import {SmallButton, SmallMarginTextField} from '../../template/smallComponents'

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
        <SectionWithFullHeightFlex className="SectionWithFullHeightFlex ImageBox" flexGrow="0" width="1" >
            <BorderedBox display="flex" alignContent="center" flexGrow="1">
                <Box bgcolor="midnightblue" display="flex" flexDirection="row" width="1" textAlign={"center"}>
                    <Box display="flex" width="0.3" justifyContent="space-around" alignItems="baseline" flexShrink="0" flexDirection="row">
                        <Box width="150px">
                            <Typography variant={"body1"}>Save Directory</Typography>
                        </Box>
                        <SmallMarginTextField
                            variant="outlined"
                            margin="dense"
                            value={pageSaveDirectory}
                            onChange={onSaveDirectoryChange}
                            fullWidth
                        ></SmallMarginTextField>
                        <Box width="150px">
                            <SmallButton size="small" color="primary" variant={"contained"} onClick={onClickSelectSaveDirectory}>Choose</SmallButton>
                        </Box>
                    </Box>
                    <Box display="flex" ml="auto" justifyContent="space-around" alignItems="center" flexShrink="0" flexDirection="row" >
                        <SmallButton size="small" color="primary" variant={"contained"} onClick={onClickSetAllChecked}>Select All</SmallButton>
                        <SmallButton size="small" color="primary" variant={"contained"} onClick={onClickSavelAllChecked}>Save Selected</SmallButton>
                        <SmallButton size="small" color="primary" variant={"contained"} onClick={deleteFilesSelected}>Delete Selected</SmallButton>
                    </Box>            
                </Box>
            </BorderedBox>
        </SectionWithFullHeightFlex>
    )
}
