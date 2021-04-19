/**
 * isDefined
 *
 * @param value
 */
export const isDefined = <T>(value: T | undefined | null): value is T => (value as T) !== undefined;
