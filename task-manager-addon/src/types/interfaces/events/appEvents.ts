import { Dict } from '../../templates/Dict';

/**
 * JSEvents
 */
export enum JSEvents {
  WINDOW_FOCUS_IN,
  WINDOW_FOCUS_OUT,
}

/**
 * UIEvents
 */
export enum UIEvents {
  PANEL_CHANGE = 'PANEL_CHANGE',
}

/**
 * AppEvent - all events in app
 */
export type AppEvent = {
  eventType: UIEvents | JSEvents;
  data?: Dict<any>;
};
