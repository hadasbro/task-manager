/**
 * Tuple
 */
type Tuple<Elem, Length extends number> = [Elem, ...Elem[]] & { length: Length };
