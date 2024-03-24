const ErrorMiddleware = (error, req, res, next) => {
  if (error instanceof Error) {
    const errorTitle = error.message || "Server Error !!!";
    let errorDetail = null;
    let errorStatus = error.status_code || 500;

    // Check if the serializerError method exists before calling it
    if (typeof error.serializerError === "function") {
      errorDetail = error.serializerError();
    }

    const errorPayload = {};

    if (errorStatus) {
      errorPayload.errorStatus = errorStatus;
    }

    if (errorTitle) {
      errorPayload.errorTitle = errorTitle;
    }

    if (errorDetail) {
      errorPayload.errorDetail = errorDetail;
    }

    return res.status(errorStatus).json(errorPayload);
  }

  res.status(400).json({ error: error });
};
module.exports = ErrorMiddleware;
