export class UIControllerInvalidInput extends Error {
  private input: string;

  constructor(message: string, input: string) {
    super(message);
    this.input = input;
  }

  toString() {
    return `${this.message}: ${this.input}`;
  }
}
