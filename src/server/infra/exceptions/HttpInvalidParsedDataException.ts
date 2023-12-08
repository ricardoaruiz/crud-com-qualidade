import { HttpBaseException } from "./HttpBaseException";

export class HttpInvalidParsedDataException extends HttpBaseException {
  constructor(message: string) {
    super(message, 422);
    this.name = "HttpInvalidParsedDataException";
  }
}
