import { eventChannel } from 'redux-saga';
import dayjs from 'dayjs';
import { dayjsExt } from '../../../../../extensions/dayjs';

/**
 * appLoggerChannel
 *
 * Channel is used for processing global events and global behaviours happening in the app.
 * For example panel's change should also cause closing of all alert messages for currecnt panel,
 * so changeing panel is kind of global even which causes some other actions in the app. This kind
 * of events can be passed to this channel and processed here.
 */
export const channel = (interval: number = 10 * 1000) =>
  eventChannel<dayjs.Dayjs>(emitter => {
    const iv = setInterval(() => {
      emitter(dayjsExt());
    }, interval);

    return () => {
      clearInterval(iv);
    };
  });
