import React from 'react';
import {Input, Label} from 'reactstrap';

const InputForm = ({name, handleChange, type, placeholder}) => (
    <React.Fragment>
        <Label for={name}>{name}</Label>
        <Input
            onChange={e => handleChange(e, name)}
            type={type}
            name={name}
            placeholder={placeholder}/>
    </React.Fragment>
);


export default InputForm;