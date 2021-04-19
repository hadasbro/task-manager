import ValidationException from '../../../exceptions/system/ValidationException';

/**
 * isTechError
 *
 * @param exc
 */
export function isValidationException(exc: Error): exc is ValidationException {
  return (exc as ValidationException).validationExc !== undefined;
}
