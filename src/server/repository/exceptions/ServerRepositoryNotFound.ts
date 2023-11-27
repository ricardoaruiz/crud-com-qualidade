export class ServerRepositoryNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RepositoryNotFound";
  }
}
