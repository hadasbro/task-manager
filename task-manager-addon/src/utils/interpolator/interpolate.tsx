import React from 'react';
import _ from 'lodash';
import { Dict } from '../../types/templates/Dict';
import { Nullable } from '../../types/templates/Nullable';
import { isFunction } from '../../types/guards/general/isFunction';

/**
 * InterpolatorType
 */
export type InterpolatorType = (
  str: string,
  values: Dict<string | (() => JSX.Element), string>,
  tag?: string,
) => Nullable<JSX.Element>;

/**
 * interpolate
 *
 * Translate placeholders like
 * Task #task# reassigned by user #user# #from# → #to#
 * based on translations like {task: a1, user: a2, from: a3, to: a4}
 * where a1 ... a4 can be JSX e.g. <a href='xxx'>aomething</a>
 *
 * @param str
 * @param values
 * @param tag
 */
export const interpolate: InterpolatorType = (str, values, tag = '#') => {
  const placeholderRegexp = new RegExp(`(${tag}[a-z]+?${tag})`, 'g');
  const tagRegexp = new RegExp(`(${tag}*)`, 'g');
  const splitted = str.split(placeholderRegexp);

  return splitted
    .filter(part => !_.isEmpty(part))
    .map(part => {
      if (part.includes(tag)) {
        const clearKey = part.replace(tagRegexp, '');
        if (_.has(values, clearKey)) {
          if (isFunction(values[clearKey])) {
            return (values[clearKey] as Function).call(null) as JSX.Element;
          }
          return <>{values[clearKey]}</>;
        }
      }
      return <>{part}</>;
    })
    .reduce(
      (acc: Nullable<JSX.Element>, el) =>
        acc === null ? (
          el
        ) : (
          <>
            {acc}
            {el}
          </>
        ),
      null,
    );
};
