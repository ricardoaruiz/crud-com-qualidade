import { HttpBaseException } from "./HttpBaseException";

export class HttpNotFoundException extends HttpBaseException {
  constructor(message: string) {
    super(message, 404);
    this.name = "HttpNotFoundException";
  }
}
