/**
 * ValidationException
 */
export default class ValidationException extends Error {
  private trace: string;

  public validationExc: boolean = true;

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
