import { HttpInternalServerErrorException } from "./HttpInternalServerErrorException";

export class HttpNotFoundException extends HttpInternalServerErrorException {
  constructor(message: string) {
    super(message, 404);
    this.name = "HttpNotFoundException";
  }
}
