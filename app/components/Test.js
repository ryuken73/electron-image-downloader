import React from 'react';
import Button from '@material-ui/core/Button';

export default function Test() {
    const [name, setName] = React.useState('ryu');
    return (
        <div>
            test functional component : {name}
            <Button variant="outlined">Submit</Button>
        </div>
    )
}
