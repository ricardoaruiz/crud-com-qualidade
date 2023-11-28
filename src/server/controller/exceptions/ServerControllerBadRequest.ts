import { ServerControllerGeneralException } from "./ServerControllerGeneralException";

export class ServerControllerBadRequest extends ServerControllerGeneralException {
  constructor(message: string) {
    super(message);
    this.name = "ServerControllerBadRequest";
  }
}
