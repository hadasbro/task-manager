import React, { FC, useEffect, useState, MouseEvent } from 'react';
import { AccessTime } from '@material-ui/icons';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { TaskActivityStatus } from '../../../init/enums/settings/TaskActivityStatus';
import { OnTimerAction } from '../../../types/interfaces/datetime';
import { TimerActions } from '../../../init/enums/settings/TimerActions';
import { secondsToHMS } from '../../../functions/datetime/secondsToHMS';

/**
 * TaskTimer
 *
 * @param onAction
 * @param taskId
 * @param timeTodayUser
 * @param timeAllUser
 * @param activityStatus
 * @constructor
 */
const TaskTimer: FC<{
  taskId: string;
  timeTodayUser: number;
  timeAllUser: number;
  activityStatus: TaskActivityStatus;
  onAction: OnTimerAction;
}> = ({ onAction, taskId, timeTodayUser = 0, timeAllUser = 0, activityStatus }) => {
  const running = activityStatus === TaskActivityStatus.RUNNING;

  const [btnColor, setBtnColor] = useState<{
    play: LayoutColorsDisabled;
    stop: LayoutColorsDisabled;
  }>({
    play: running ? 'secondary' : 'disabled',
    stop: 'disabled',
  });

  const [time, setTime] = useState<{ today: number; all: number }>({
    today: timeTodayUser,
    all: timeAllUser,
  });

  // tasksList's timer
  useEffect(() => {
    const intervalSec = 1;

    if (running) {
      const intervalId = setInterval(() => {
        setTime(prev => ({
          today: prev.today + intervalSec,
          all: prev.all + intervalSec,
        }));
      }, 1000 * intervalSec);

      return () => clearInterval(intervalId);
    }

    return () => {};
  }, [running]);

  const onMouseEnterTimer = (e: MouseEvent) => {
    if (e.currentTarget.getAttribute('data-type') === TimerActions.PLAY) {
      if (running) return false;

      setBtnColor(prev => ({
        ...prev,
        play: 'primary',
      }));
    } else {
      setBtnColor(prev => ({
        ...prev,
        stop: 'primary',
      }));
    }

    return true;
  };

  const onMouseLeaveTimer = (e: MouseEvent) => {
    if (e.currentTarget.getAttribute('data-type') === TimerActions.PLAY) {
      if (running) return false;

      setBtnColor({
        ...btnColor,
        play: 'disabled',
      });
    } else {
      setBtnColor({
        ...btnColor,
        stop: 'disabled',
      });
    }

    return true;
  };

  const onClickPlayButton = (e: MouseEvent) => {
    if (e.currentTarget.getAttribute('data-type') === TimerActions.PLAY) {
      if (running) return false;

      onAction(TimerActions.PLAY, taskId);
    } else if (running) {
      onAction(TimerActions.STOP, taskId);
    }

    return true;
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <AccessTime fontSize="small" alignmentBaseline="middle" />
            </td>
            <td>
              <div title="My time today" style={{ fontSize: 11 }}>
                {secondsToHMS(time.today)}
              </div>
              <div title="My time all days" style={{ fontSize: 9 }}>
                <i>{secondsToHMS(time.all)}</i>
              </div>
            </td>
            <td>
              {running && (
                <StopIcon
                  style={{ margin: 0 }}
                  data-type={TimerActions.STOP}
                  color={btnColor.stop}
                  onMouseEnter={onMouseEnterTimer}
                  onMouseLeave={onMouseLeaveTimer}
                  onClick={onClickPlayButton}
                />
              )}

              <PlayArrowIcon
                style={{ margin: 0 }}
                data-type={TimerActions.PLAY}
                color={btnColor.play}
                onMouseEnter={onMouseEnterTimer}
                onMouseLeave={onMouseLeaveTimer}
                onClick={onClickPlayButton}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TaskTimer;
