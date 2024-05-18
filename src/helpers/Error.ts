class CustomError extends Error {
  status: number;
  errorCode: null | number;
  constructor(message: string, status: number = 500, errorCode = null) {
    super();
    this.message = message;
    this.status = status;
    this.errorCode = errorCode;
  }
}

export default CustomError;
