import React, { ChangeEventHandler, FC } from 'react';
import TextField from '@material-ui/core/TextField';
import { useTimePickerStyles } from '../../../styles/styles/forms';

type TimePickerType = {
  defaultValue?: string;
  label?: string;
  type?: string;
  name?: string;
  disabled?: boolean;
  id?: string;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>;
};

/**
 * TimePickers
 *
 * @param id
 * @param name
 * @param onChangeHandler
 * @param disabled
 * @param type
 * @param defaultValue
 * @param label
 * @constructor
 */
const TimePickers: FC<TimePickerType> = ({
  id,
  name,
  onChangeHandler,
  disabled = false,
  type = 'time',
  defaultValue = '00:00',
  label = '',
}) => {
  const classes = useTimePickerStyles();

  return (
    <TextField
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChangeHandler}
      name={name}
      id={id}
      label={label}
      type={type}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default TimePickers;
