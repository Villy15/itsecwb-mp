const errorHandler = (err, req, res, next) => {
  // Check if headers have already been sent
  if (res.headersSent) {
    // If headers are sent, delegate to the default Express error handler
    return next(err);
  }

  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHandler;