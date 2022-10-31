class UserConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserConflictError';
    this.statusCode = 409;
  }
}

module.exports = UserConflictError;
