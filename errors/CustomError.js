class CommonError extends Error {
  status_code;
  constructor(status_code = 500, message = "Something is wrong!!!") {
    super(message);
    this.status_code = status_code;
  }
}

module.exports = CommonError;
