
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const SmallPaddingIconButton = styled(IconButton)`
    padding: 5px;
`

const SmallMarginTextField = styled(TextField)`
    margin-top: ${props => props.mt || "2px"};
    margin-bottom: ${props => props.mb || "2px"};
    .MuiInputBase-input {
        padding-top: ${props => props.pt || "5px"};
        padding-bottom: ${props => props.pb || "5px"};
    }    
`

const SmallPaddingFormControlLabel = styled(FormControlLabel)`
    .MuiRadio-root {
        padding-top: 1px;
        padding-bottom: 1px;
        padding-left: 9px;
        padding-right: 5px;
    }
`

export {
    SmallPaddingIconButton,
    SmallMarginTextField,
    SmallPaddingFormControlLabel
}