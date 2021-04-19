import { DependencyList, useCallback } from 'react';
import { interpolate, InterpolatorType } from '../../utils/interpolator/interpolate';

/**
 * useInterpolator
 */
export const useInterpolator = (deps?: DependencyList): InterpolatorType => {
  return useCallback((str, values, tag = '#') => {
    return interpolate(str, values, tag);
  }, deps || []);
};
