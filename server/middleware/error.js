const errorHandler = (err, req, res, next) => {
  // Check if headers have already been sent
  if (res.headersSent) {
    // If headers are sent, delegate to the default Express error handler
    return next(err);
  }

  if (err.status) {
    if (process.env.DEBUG != "true") {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(err.status).json({
        message: err.message,
        stackTrace: err.stack,
      });
    }
  } else {
    if (process.env.DEBUG != "true") {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res
        .status(500)
        .json({ message: "Internal Server Error", stack: err.stack });
    }
  }
};

export default errorHandler;
