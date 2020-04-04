import React from 'react';
import BorderdBox from './BorderedBox';

export default function BorderedList(props) {
    const {titleComponent, titleWidth="20%", contentComponent} = props;
    const {alignItems="center"}  = props;
    return (
        <BorderdBox display="flex" alignItems={alignItems} {...props}>
            <BorderdBox border={0} width={titleWidth}>{titleComponent}</BorderdBox>
            <BorderdBox border={0} flex={1} display="flex" alignItems="center" >
                {contentComponent}
            </BorderdBox>
        </BorderdBox>
    )
}
