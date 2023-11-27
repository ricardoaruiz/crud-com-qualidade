export class ServerControllerBadRequest extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ControllerBadRequest";
  }
}
