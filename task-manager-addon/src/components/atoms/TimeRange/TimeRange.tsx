/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, FC } from 'react';
import TimePickers from '../TimePicker/TimePicker';

/**
 * BreakRangeComponentProps
 */
interface BreakRangeComponentProps {
  initFrom?: string;
  initTo?: string;
  disabled?: boolean;
  deleteButton?: boolean;
  groupKey: number;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>, fromTo: 'from' | 'to', key: number) => void;
  onDeleteHandler: (key: number) => void;
}

/**
 * TimeRangeLabels
 */
export interface TimeRangeLabels {
  labels: {
    from: string;
    to: string;
    rem: string;
    add: string;
  };
}

/**
 * TimeRange
 *
 * @param onChangeHandler
 * @param onDeleteHandler
 * @param groupKey
 * @param initFrom
 * @param initTo
 * @param disabled
 * @param translation
 * @constructor
 */
const TimeRange: FC<BreakRangeComponentProps & TimeRangeLabels> = ({
  onChangeHandler,
  onDeleteHandler,
  groupKey,
  initFrom = '00:00',
  initTo = '00:00',
  disabled = false,
  deleteButton = true,
  labels: { from, to, rem },
}) => {
  return (
    <div style={{ background: 'rgb(247,247,247)', width: '80%', marginTop: 15, padding: 10, lineHeight: '40px' }}>
      <div className="breakGroup">
        <div className="breaks-group">
          <div>
            <label>
              {from}
              <TimePickers
                onChangeHandler={e => onChangeHandler(e, 'from', groupKey)}
                disabled={disabled}
                defaultValue={initFrom}
              />
            </label>
            <br />
            <label>
              {to}
              <TimePickers
                onChangeHandler={e => onChangeHandler(e, 'to', groupKey)}
                disabled={disabled}
                defaultValue={initTo}
              />
            </label>
            <br />
            {deleteButton && (
              <button
                style={{ marginTop: 20 }}
                type="button"
                onClick={() => onDeleteHandler(groupKey)}
                disabled={disabled}
              >
                [ - ] {rem}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeRange;
