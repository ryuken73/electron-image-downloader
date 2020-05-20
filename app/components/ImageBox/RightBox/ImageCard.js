import React from 'react';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import Checkbox  from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const styles = makeStyles({
    container: props =>({
        padding: '5px',
        margin: '5px',
        display: 'flex',
        flexDirection: 'column',
        order: props.order,
        display: !props.image.show && 'none' 
    }),
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
        margin: '5px',
        maxWidth: '500px'
    }
})

function ImageCard(props) {
    console.log('######################### re-render', props.image)
    const classes = styles(props);
    const {container, imageName, smallBtn, smallCheckBox, image} = classes;
    const {index, imageFname, imageSrc, metadata, checked, show} = props.image;
    const {sizeKB, reqUrl} = metadata;
    const {setImageToggleChecked, onClickSave, onClickRemove} = props;
    const {setImagePreviewOpen, setImagePreviewSrc} = props;
    const {delImage} = props;

    const onClickImage = React.useCallback(() => {
        setImagePreviewOpen(true);
        setImagePreviewSrc(imageSrc);
    },[imageSrc])

    const onClickCheckBox = React.useCallback(() => {
        setImageToggleChecked(index);
    },[index])

    const onClickDeleteBtn = React.useCallback(() => {
        delImage(index); 
    },[index])

    return (
        <Paper className={container} elevation={3} > 
            <Box bgcolor="aliceblue">
                <Checkbox className={smallCheckBox} checked={checked} onChange={onClickCheckBox}></Checkbox>
                <Typography className={imageName} variant="caption">{imageFname} [{sizeKB}KB]</Typography>
            </Box>   
            <Box className="handle" display="flex" flexDirection="row" width="1">
                <Box bgcolor="black" display="flex" justifyContent="center" flex="1">
                    <Tooltip title={reqUrl}>
                        <img className={image} alt="poster" src={imageSrc} style={{height:'80px'}} onClick={onClickImage}></img>
                    </Tooltip>
                </Box>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center" width={1}>
                <Button className={smallBtn} onClick={onClickSave} variant="contained">Save</Button>  
                <Button className={smallBtn} onClick={onClickDeleteBtn} variant="contained" >Remove</Button>  
            </Box>
        </Paper>
    ) 
}

export default React.memo(ImageCard);