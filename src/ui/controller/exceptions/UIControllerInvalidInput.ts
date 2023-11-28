import { UIControllerException } from "./UIControllerException";

export class UIControllerInvalidInput extends UIControllerException {
  private input: string;

  /**
   * Initializes a new instance of the class.
   *
   * @param {string} message - The error message.
   * @param {string} input - The input value.
   */
  constructor(message: string, input: string) {
    super(message);
    this.input = input;
  }

  /**
   * Returns a string representation of the object.
   *
   * @return {string} A string representation of the object.
   */
  toString(): string {
    return `${super.toString()} ${this.input}`;
  }
}
