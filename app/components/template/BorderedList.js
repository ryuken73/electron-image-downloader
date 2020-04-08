import React from 'react';
import BorderdBox from './BorderedBox';

export default function BorderedList(props) {
    const {title, titleWidth="20%", content} = props;
    const {alignItems="center"}  = props;
    return (
        <BorderdBox display="flex" alignItems={alignItems} {...props}>
            <BorderdBox border={0} width={titleWidth}>{title}</BorderdBox>
            <BorderdBox border={0} flex={1} display="flex" alignItems="center" >
                {content}
            </BorderdBox>
        </BorderdBox>
    )
}
