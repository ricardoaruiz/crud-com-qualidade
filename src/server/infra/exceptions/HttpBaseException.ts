import { ServerErrorData } from "./ServerErrorData";

export class HttpBaseException extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "HttpBaseException";
  }

  toObject(): ServerErrorData {
    return {
      error: { message: this.message },
    };
  }
}
