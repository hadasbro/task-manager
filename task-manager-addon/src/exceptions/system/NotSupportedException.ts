/**
 * NotSupportedException
 */
export default class NotSupportedException extends Error {
  private trace: string;

  /**
   * constructor
   *
   * @param message
   * @param trace
   */
  constructor(message: string = 'Method or actions not supported', trace?) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.trace = trace || '';
  }
}
