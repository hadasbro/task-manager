import { ResponseError } from '../../exceptions/api/ResponseError';
import { checkStatus } from './checkStatus';
import { parseJson } from './parseJson';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export const request = async (url: string, options?: RequestInit): Promise<{} | { err: ResponseError }> => {
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJson(response);
};
