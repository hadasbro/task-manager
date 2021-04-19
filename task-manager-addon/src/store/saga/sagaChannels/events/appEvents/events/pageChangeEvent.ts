import { routes } from '../../../../../../routing/routes';
import { OptionalObj } from '../../../../../../types/templates/OptionalObj';

/**
 * PageChangeEventType
 *
 * Custom event for page's change
 *
 * usage:
 *
 * const pageChangeEvent: PageChangeEventType = new CustomEvent(UIEvents.PANEL_CHANGE, {from:..., to:...});
 * window.document.dispatchEvent(pageChangeEvent);
 */
export type PageChangeEventType = CustomEvent<
  OptionalObj<{ from: keyof typeof routes | string; to: keyof typeof routes | string }>
>;
