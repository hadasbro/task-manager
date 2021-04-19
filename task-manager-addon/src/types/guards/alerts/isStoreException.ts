import { StoreException } from '../../../exceptions/store/StoreException';

/**
 * isTechError
 *
 * @param exc
 */
export function isStoreException(exc: Error | StoreException): exc is StoreException {
  return (exc as StoreException).storeExc !== undefined;
}
