export class PersistencyError extends Error {
  constructor(message = 'Unexpected Persistency Error') {
    super(message);
    this.name = 'PersistencyError';
  }
}
