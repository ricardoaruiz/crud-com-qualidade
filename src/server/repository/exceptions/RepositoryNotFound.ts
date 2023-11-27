export class RepositoryNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RepositoryNotFound";
  }
}
