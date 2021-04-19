/**
 * Unpromisify
 */
export type Unpromisify<T> = T extends Promise<infer P> ? P : never;
