import React from 'react';
import BorderdBox from './BorderedBox';

export default function BorderedList(props) {
    const {title, titlewidth="20%", content} = props;
    const {alignItems="center", bgcolor, border}  = props;
    return (
        <BorderdBox display="flex" alignItems={alignItems} bgcolor={bgcolor} border={border}>
            <BorderdBox border={0} width={titlewidth} bgcolor={bgcolor} border={border}>
                {title}
            </BorderdBox>
            <BorderdBox border={0} flex={1} display="flex" alignItems="center" bgcolor={bgcolor} border={border}>
                {content}
            </BorderdBox>
        </BorderdBox>
    )
}
