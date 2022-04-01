import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const messages = {
    'min' : 'yuhuuu',
    'mai' : 'YUHUUU'
}

function MyButton(props){
    let [y, setY] = useState(props.y || 'min');

    // let text = messages[props.y];
    // if(props.y === undefined)
    //     text = 'muuuu';
    // else{
    //     text = messages[props.y];
    // }
    return (
        <Button onClick={() => {
            if(y === 'min')
                setY('mai');
            else if (y == 'mai')
                setY('min');
        }}>
             {messages[y]}
        </Button>
    );
}

export default MyButton;