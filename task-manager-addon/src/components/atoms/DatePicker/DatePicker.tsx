import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useTLineStyles } from '../../../styles/styles/modules';
import { dayjsExt, dayjsObj } from '../../../extensions/dayjs';
import { OptionalDayjsObj } from '../../../types/interfaces/datetime';
import { Nullable } from '../../../types/templates/Nullable';
import { isDefined } from '../../../types/guards/general/isDefined';
import { isNotEmpty } from '../../../types/guards/general/isNotEmpty';

/**
 * DatePickerProps
 */
type DatePickerProps = {
  label?: string;
  date?: Nullable<OptionalDayjsObj>;
  setDate?: (date: Nullable<OptionalDayjsObj>) => void;
};

/**
 * DatePicker
 *
 * @constructor
 */
const DatePicker: FC<DatePickerProps> = ({ label = null, date = null, setDate }) => {
  const handleDateChange = (pickedDate: Nullable<Date>) => {
    if (!isDefined(setDate)) {
      return;
    }

    if (pickedDate) {
      setDate(dayjsObj(pickedDate));
    } else {
      setDate(null);
    }
  };

  const classes2 = useTLineStyles();

  return (
    <div className={classes2.formControl}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center">
          <KeyboardDatePicker
            InputAdornmentProps={{ position: 'start' }}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label={label}
            value={isNotEmpty(date) ? dayjsExt(date).toDate() : null}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
