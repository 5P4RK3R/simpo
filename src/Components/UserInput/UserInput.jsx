import React from 'react';
import TextField from '@material-ui/core/TextField';
export const UserInput = ({name,value,trigger,label,step}) => {
    return (
        <>
          <TextField
            id={label}
            name={name}
            label={label}
            value={value}
            step={step}
            onChange={trigger}
          />
        </>
    )
}