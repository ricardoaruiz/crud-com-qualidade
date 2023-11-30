import { ServerErrorData } from "./ServerErrorData";

export class HttpInternalServerErrorException extends Error {
  status: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 500;
    this.name = "HttpInternalServerErrorException";
  }

  toObject(): ServerErrorData {
    return {
      error: { message: this.message },
    };
  }
}
