import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

export const SelectInput = ({name,value,trigger,label,options}) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          id={label}
          name={name}
          value={value}
          onChange={trigger}
        >
          {options.map((option,index)=>(
          <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
