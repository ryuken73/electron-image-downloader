import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import deepPurple from '@material-ui/core/colors/deepPurple';

const defaultBgColor = deepPurple[800];
const defaultFontColor = 'white';

const SmallPaddingIconButton = styled(IconButton)`
    padding: 5px;
`
const SmallButton  = styled(Button)`
    margin: 5px;
    font-size: 11px;
`

const SmallMarginTextField = styled(TextField)`
    margin-top: ${props => props.mt || "2px"};
    margin-bottom: ${props => props.mb || "2px"};
    background: ${props => props.bgcolor || defaultBgColor};
    .MuiInputBase-input {
        padding-top: ${props => props.pt || "5px"};
        padding-bottom: ${props => props.pb || "5px"};
        color: ${props => props.textColor || defaultFontColor};
    }
    .MuiOutlinedInput-root {
        border-radius: 0px;
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
const SmallPaddingSelect = styled(Select)`
    .MuiSelect-root {
        padding-top: ${props => props.pt || "5px"};
        padding-bottom: ${props => props.pb || "5px"};
        background: ${defaultBgColor};
        color: ${defaultFontColor};

    }
`
export {
    SmallPaddingIconButton,
    SmallMarginTextField,
    SmallPaddingFormControlLabel,
    SmallPaddingSelect,
    SmallButton
}