import { ServerControllerException } from "./ServerControllerException";

export class ServerControllerGeneralException extends Error {
  /**
   * Initialize a new instance of the ControllerGeneralException class.
   *
   * @param {string} message - The error message.
   * @return {void} The new instance of the ControllerGeneralException class.
   */
  constructor(message: string) {
    super(message);
    this.name = "ControllerGeneralException";
  }

  /**
   * Converts the ServerControllerException object to a plain JavaScript object.
   *
   * @return {ServerControllerException} The plain JavaScript object representing the ServerControllerException.
   */
  toObject(): ServerControllerException {
    return {
      error: { message: this.message },
    };
  }
}
