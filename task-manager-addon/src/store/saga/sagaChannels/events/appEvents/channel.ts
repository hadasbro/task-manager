import { eventChannel } from 'redux-saga';
import { AppEvent, JSEvents, UIEvents } from '../../../../../types/interfaces/events/appEvents';
import { PageChangeEventType } from './events/pageChangeEvent';

/**
 * appLoggerChannel
 *
 * Channel is used for processing global events and global behaviours happening in the app.
 * For example panel's change should also cause closing of all alert messages for currecnt panel,
 * so changeing panel is kind of global even which causes some other actions in the app. This kind
 * of events can be passed to this channel and processed here.
 */
export const channel = () =>
  eventChannel<AppEvent>(emit => {
    const wd = window.document;

    /**
     * handleChangePage
     */
    const handleChangePage = ((e: PageChangeEventType) => {
      emit({ eventType: UIEvents.PANEL_CHANGE, data: { ...e.detail } });
    }) as EventListener;

    /**
     * handleFocusChange
     *
     * @param e
     */
    const handleFocusChange = (e: Event) => {
      emit({ eventType: wd.hasFocus() ? JSEvents.WINDOW_FOCUS_IN : JSEvents.WINDOW_FOCUS_OUT });
    };

    // change panel (page)
    wd.addEventListener(UIEvents.PANEL_CHANGE, handleChangePage, false);

    // change focus
    wd.addEventListener('visibilitychange', handleFocusChange);

    return () => {
      wd.removeEventListener('visibilitychange', handleFocusChange);
      wd.removeEventListener(UIEvents.PANEL_CHANGE, handleChangePage);
    };
  });
