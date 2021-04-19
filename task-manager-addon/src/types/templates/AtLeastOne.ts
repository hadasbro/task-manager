/**
 * https://stackoverflow.com/questions/48230773/how-to-create-a-partial-like-that-requires-a-single-property-to-be-set/48244432
 */
export type AtLeastOne<T> = { [K in keyof T]: Pick<T, K> }[keyof T];
