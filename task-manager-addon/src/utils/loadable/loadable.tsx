import React, { ComponentProps, ComponentType, lazy, ReactNode, Suspense } from 'react';
import { Unpromisify } from '../../types/templates/Unpromisify';

/**
 * Opts
 */
interface Opts {
  fallback: ReactNode;
}

/**
 * lazyLoad
 *
 * @param importFunc
 * @param selectorFunc
 * @param opts
 */
export const lazyLoad = <T extends Promise<any>, U extends ComponentType<any>>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  opts: Opts = { fallback: null },
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () => importFunc().then(module => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  return (props: ComponentProps<U>): JSX.Element => (
    <Suspense fallback={opts.fallback!}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <LazyComponent {...props} />
    </Suspense>
  );
};
