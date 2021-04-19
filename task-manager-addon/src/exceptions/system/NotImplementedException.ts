/**
 * NotImplementedException
 */
export default class NotImplementedException extends Error {
  private trace: string;

  /**
   * constructor
   *
   * @param message
   * @param trace
   */
  constructor(message: string = 'Method or actions not implemented', trace?) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.trace = trace || '';
  }
}
