import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export const DatePicker = ({name,value,trigger,label,maxDate,minDate}) => {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id={label}
          label={label}
          name={name}
          format="MM/dd/yyyy"
          value={value}
          onChange={trigger}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          maxDate={maxDate}
          minDate={minDate}
        />
    </MuiPickersUtilsProvider>
  );
}
