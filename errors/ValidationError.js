class ValidationError extends Error {
  status_code = 400;
  validationError = [];
  constructor(message = "Invalid Request Parameter", validationError = []) {
    super(message);
    this.validationError = validationError;
  }
  serializerError() {
    return this.validationError.map((err) => {
      return { message: err.msg, field: err.path };
    });
  }
}

module.exports = ValidationError;
