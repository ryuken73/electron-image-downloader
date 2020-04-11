import React from 'react';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import Checkbox  from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles({
    container: {
        padding: '5px',
        margin: '5px',
        display: 'flex',
        flexDirection: 'column'
    },
    imageName: {
        paddingLeft: '4px'
    },
    smallCheckBox : {
        padding: '0px'
    },
    smallBtn : {
        padding : "1px 3px",
        fontSize : "10px",
        margin : "3px"
    },
    image: {
        margin: '5px'
    }
})

function ImageCard(props) {
    console.log('re-render', props.image)
    const classes = styles();
    const {container, imageName, smallBtn, smallCheckBox, image} = classes;
    const {index, tmpFname, tmpSrc, metadata, checked} = props.image;
    const {toggleCheck, onClickSave, onClickRemove} = props;
    // displaySrc == javascript Array Buffer (Unit8)
    // Array Buffer to Blob and then Blob to object url
    // const imageBlob = new window.Blob(displaySrc);
    // const dataUrl = window.URL.createObjectURL(imageBlob);
    // console.log(imageBlob)
    // console.log(dataUrl)
    // console.log(window)
    return (
        <Paper className={container} elevation={3} > 
            <Box bgcolor="aliceblue">
                <Checkbox className={smallCheckBox} checked={checked} onChange={toggleCheck(index)}></Checkbox>
                <Typography className={imageName} variant="caption">[{index}] {tmpFname}</Typography>
            </Box>   
            <Box className="handle" display="flex" flexDirection="row" width="1">
                <Box bgcolor="black" display="flex" justifyContent="center" flex="1">
                    <img className={image} alt="poster" src={tmpSrc} style={{height:'80px'}}></img>
                </Box>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center" width={1}>
                    <Button className={smallBtn} onClick={onClickSave} variant="contained">Save</Button>  
                    <Button className={smallBtn} onClick={onClickRemove} variant="contained" >Remove</Button>  
            </Box>
        </Paper>
    ) 
}

export default React.memo(ImageCard);