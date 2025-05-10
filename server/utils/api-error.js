export class ApiError extends Error {
  constructor(statusCode, message, data) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.data = data;
  }
}
