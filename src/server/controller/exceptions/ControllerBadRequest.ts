export class ControllerBadRequest extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ControllerBadRequest";
  }
}
