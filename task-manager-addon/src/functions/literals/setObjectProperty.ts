/**
 * setObjectProperty
 *
 * Set value on object (typesafe version of name['navKey'] = 'value')
 *
 *  Example:
 *  let abc: { a: number } = { a: 123 };
 *  let a = setObjectProperty('another_key', 'value')(abc);
 *  a['another_key']; // value
 *  abc['another_key']; // value
 *
 * @param key
 * @param value
 */
export const setObjectProperty = (key: string, value: any) => (obj: Record<string, any>) => {
  // eslint-disable-next-line no-param-reassign
  obj[key] = value;
  return obj;
};
