/**
 * getObjPropertyGeneric
 *
 * Get object's property value
 *
 * Example 1:
 *  let abc: { a: number } = { a: 123 }
 *  let value = getObjPropertyGeneric<typeof abc, 'a'>('a')(abc);
 *  value; // 123
 *
 * Example 2:
 *  interface AbcInterface { a: number }
 *  let abc2: AbcInterface = { a: 123 }
 *  let value2 = getObjPropertyGeneric<AbcInterface, 'a'>('a')(abc);
 *  value; // 123
 *
 * @param key
 */
export const getObjPropertyGeneric = <T extends object, U extends keyof T>(key: U) => (obj: T) => obj[key];
