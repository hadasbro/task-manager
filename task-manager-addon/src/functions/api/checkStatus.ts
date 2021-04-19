import { ResponseError } from '../../exceptions/api/ResponseError';

/**
 * checkStatus
 *
 * @param response
 */
export const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
};
