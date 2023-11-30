import { HttpInternalServerErrorException } from "./HttpInternalServerErrorException";

export class HttpBadRequestException extends HttpInternalServerErrorException {
  constructor(message: string) {
    super(message, 404);
    this.name = "HttpBadRequestException";
  }
}
