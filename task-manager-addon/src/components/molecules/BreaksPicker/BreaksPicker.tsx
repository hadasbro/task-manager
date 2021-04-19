/* eslint-disable react/jsx-curly-brace-presence */
import React, { ChangeEvent, FC } from 'react';
import _ from 'lodash';
import { dayjsFormat } from '../../../extensions/dayjs';
import TimeRange, { TimeRangeLabels } from '../../atoms/TimeRange/TimeRange';
import { Dict } from '../../../types/templates/Dict';
import { DayjsObj } from '../../../types/interfaces/datetime/DayjsObj';

/**
 * BreaksPickerProps
 */
interface BreaksPickerProps {
  breaksList?: Dict<[DayjsObj, DayjsObj], number>;
  disabled?: boolean;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>, fromTo: 'from' | 'to', key: number) => void;
  onDeleteHandler: (key: number) => void;
  onAddHandler: () => void;
}

/**
 * BreaksPicker
 *
 * @param breaksList
 * @param onChangeHandler
 * @param onDeleteHandler
 * @param onAddHandler
 * @param disabled
 * @param translation
 * @constructor
 */
const BreaksPicker: FC<BreaksPickerProps & TimeRangeLabels> = ({
  breaksList,
  onChangeHandler,
  onDeleteHandler,
  onAddHandler,
  disabled = false,
  labels: { from, to, rem, add },
}) => {
  return (
    <div>
      <button type="button" disabled={disabled} onClick={() => onAddHandler()}>
        [ + ] {add}
      </button>

      <br />

      {!_.isEmpty(breaksList) &&
        _.map(breaksList!, (value, key) => (
          <TimeRange
            onChangeHandler={onChangeHandler}
            onDeleteHandler={onDeleteHandler}
            disabled={disabled}
            initFrom={dayjsFormat(value[0], 'HH:mm')}
            initTo={dayjsFormat(value[1], 'HH:mm')}
            groupKey={_.toInteger(key)}
            key={_.toInteger(key)}
            labels={{
              from,
              to,
              rem,
              add,
            }}
          />
        ))}
    </div>
  );
};

export default BreaksPicker;
