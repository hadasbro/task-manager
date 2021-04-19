/**
 * RepositoryException
 */
export default class RepositoryException extends Error {
  private trace: string;

  public static fromAny(error: Error | string) {
    if (error instanceof Error) {
      return RepositoryException.fromError(error);
    }

    return RepositoryException.fromString(error);
  }

  /**
   * storeExceptionFromError
   *
   * @param error
   */
  public static fromError(error: Error) {
    return new RepositoryException(error.message, Error, error.stack);
  }

  /**
   * storeExceptionFromString
   *
   * @param error
   */
  public static fromString(error: string) {
    return new RepositoryException(error);
  }

  /**
   * constructor
   *
   * @param message
   * @param name
   * @param trace
   */
  constructor(message: string, name?, trace?) {
    super(message);
    this.name = name || this.constructor.name;
    this.message = message;
    this.trace = trace || '';
  }
}
