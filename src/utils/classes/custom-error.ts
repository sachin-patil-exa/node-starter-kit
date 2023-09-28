class AppCustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, errorMessage: string) {
    super(errorMessage);
    this.statusCode = statusCode;
    this.name = Error.name;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export default AppCustomError;
