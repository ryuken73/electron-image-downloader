import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';

const NonModalDialog = withStyles(
    { 
        root: { pointerEvents: "none", }, 
        paper: { pointerEvents: "auto" } 
    }
)(props => <Dialog hideBackdrop {...props} />); 


export default NonModalDialog;

