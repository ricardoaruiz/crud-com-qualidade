import { HttpBaseException } from "./HttpBaseException";

export class HttpBadRequestException extends HttpBaseException {
  constructor(message: string) {
    super(message, 400);
    this.name = "HttpBadRequestException";
  }
}
