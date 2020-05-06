import React from 'react'
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import BorderedList from './BorderedList';

export default function OptionSelectList(props) {
    const {subtitle, minWidth, fileTypes, menuItems, onChangeSelect, titlewidth="20%"} = props;
    const optionSelect = {
        title: <Typography component={'span'} variant="body1">{subtitle}</Typography>,
        content: (
            <React.Fragment>
                <FormControl style={{minWidth:minWidth}}>
                    <Select
                        labelId="select-label" 
                        variant="outlined"
                        margin="dense"
                        value={fileTypes}
                        multiple
                        onChange={onChangeSelect}
                    >
                        {menuItems.map((menuItem, index) => {
                            const {value, label} = menuItem;
                            return <MenuItem key={index} value={value}>{label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </React.Fragment>
        )
    }
    return (
        <BorderedList 
            title={optionSelect.title} 
            titlewidth={titlewidth}
            content={optionSelect.content} 
            mb={0}
        ></BorderedList>
    )
}
