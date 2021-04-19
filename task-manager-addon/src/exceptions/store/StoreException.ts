interface StoreException {
  name: string;
  message: string;
  trace?: string;
  storeExc: boolean;
}

/**
 * storeExceptionFromAny
 *
 * @param error
 */
function storeExceptionFromAny(error: Error | string): StoreException {
  if (error instanceof Error) {
    return {
      name: 'error',
      message: error.message,
      trace: error.stack,
      storeExc: true,
    };
  }

  return {
    name: 'string',
    message: error,
    trace: '',
    storeExc: true,
  };
}

/**
 * storeExceptionFromError
 *
 * @param error
 */
function storeExceptionFromError(error: Error): StoreException {
  return storeExceptionFromAny(error);
}

/**
 * storeExceptionFromString
 *
 * @param error
 */
function storeExceptionFromString(error: string): StoreException {
  return storeExceptionFromAny(error);
}

export { storeExceptionFromAny, storeExceptionFromError, storeExceptionFromString };
export type { StoreException };
