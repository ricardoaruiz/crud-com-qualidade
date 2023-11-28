export class UIControllerException extends Error {
  /**
   * Constructs a new instance of the class.
   *
   * @param {string} message - The message for the instance.
   */
  constructor(message: string) {
    super(message);
  }

  /**
   * Returns a string representation of the object.
   *
   * @return {string} the message of the object
   */
  toString(): string {
    return this.message;
  }
}
