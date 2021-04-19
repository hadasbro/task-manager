/**
 * StoreException
 */
export default class GeneralException extends Error {
  private trace: string;

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
