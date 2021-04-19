import { useState } from 'react';

/**
 * PagerHookReturnType
 */
type PagerHookReturnType = [
  number,
  boolean,
  (value: ((param: number) => number) | number) => void,
  (value: ((param: boolean) => boolean) | boolean) => void,
];

/**
 * usePager
 *
 * @param initPage
 * @param mode
 */
export const usePager = (initPage = 1, mode: 'numeric' | 'prevnext' = 'prevnext'): PagerHookReturnType => {
  const [page, setPage] = useState(initPage);
  const [nextAvaileble, setNextAvaileble] = useState(true);

  // TODO ... logic

  return [page, nextAvaileble, setPage, setNextAvaileble];
};
