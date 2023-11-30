import { HttpBaseException } from "./HttpBaseException";

export class HttpInternalServerErrorException extends HttpBaseException {
  constructor(message: string) {
    super(message, 500);
    this.name = "HttpInternalServerErrorException";
  }
}
