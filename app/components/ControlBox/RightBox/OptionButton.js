import React from 'react';
import Button from '@material-ui/core/Button';

export default function OptionButton(props) {
    const {setDialogOpen} = props.OptionDialogActions;
    const onClickOptionsBtn = () => {
        setDialogOpen(true);
    }
    return (
        <Button fullWidth onClick={onClickOptionsBtn}>Options</Button> 
    )
}
