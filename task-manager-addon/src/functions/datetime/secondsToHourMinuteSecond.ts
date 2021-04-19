/**
 * secondsToHourMinuteSecond
 *
 * @param timeInSeconds
 */
export const secondsToHourMinuteSecond = (timeInSeconds: number) => {
  const pad = (num: number, precision: number) => {
    return `000${num}`.slice(precision * -1);
  };
  const time = timeInSeconds;
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);

  return {
    hours: pad(hours, 2),
    minutes: pad(minutes, 2),
    seconds: pad(seconds, 2),
  };
};
