import { secondsToHourMinuteSecond } from './secondsToHourMinuteSecond';

/**
 * secondsToHMS
 * @param timeInSeconds
 */
export const secondsToHMS = (timeInSeconds: number) => {
  const hms = secondsToHourMinuteSecond(timeInSeconds);
  return `${hms.hours}:${hms.minutes}:${hms.seconds}`;
};
