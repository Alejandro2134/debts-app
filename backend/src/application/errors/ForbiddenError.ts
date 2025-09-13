export class ForbiddenError extends Error {
  constructor(message = 'You dont have access to the provided resource') {
    super(message);
    this.name = 'ForbiddenError';
  }
}
