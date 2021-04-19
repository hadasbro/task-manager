/* eslint-disable */
import React, { FC, ReactNode, useEffect, useState } from 'react';
import DatePicker from '../../atoms/DatePicker/DatePicker';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import { Nullable } from '../../../types/templates/Nullable';
import { OptionalDayjsObj } from '../../../types/interfaces/datetime';

/**
 * UserProviderProps
 */
type DateProviderProps = {
  withPicker?: boolean;
  children: (params: {
    date: Nullable<OptionalDayjsObj>;
    setDate: (date: Nullable<OptionalDayjsObj>) => void;
  }) => ReactNode;
  initDate?: Nullable<OptionalDayjsObj>;
};

/**
 * DateProvider
 *
 * @param children
 * @param withPicker
 * @param initDate
 * @constructor
 */
const DateProvider: FC<DateProviderProps> = ({ children, withPicker = true, initDate = null }) => {
  const [date, setDate] = useState<Nullable<OptionalDayjsObj>>(null);

  useEffect(() => {
    setDate(initDate);
  }, [initDate]);

  return (
    <>
      {withPicker && (
        <MarginAutoBox cssProperties={{ width: '65%' }}>
          <DatePicker label={'For date'} date={date} setDate={setDate} />
        </MarginAutoBox>
      )}

      {children({
        date,
        setDate,
      })}
    </>
  );
};

export default DateProvider;
