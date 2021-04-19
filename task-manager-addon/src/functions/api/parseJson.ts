/**
 * parseJson
 *
 * @param response
 */
export const parseJson = (response: Response) => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
};
