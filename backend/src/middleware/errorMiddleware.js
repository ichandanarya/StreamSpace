//This file handles all errors in one central place.

const errorHandler = (err, req, res, next) => {   // Global error handling middleware function
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;   // If the status code is still 200 (OK), we set it to 500 (Internal Server Error) for unhandled errors
  let message = err.message;    // Extracting the error message from the error object

  res.status(statusCode).json({
    success: false,   // Indicating that the request was not successful
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,    // In production, we don't want to expose the stack trace for security reasons
  });
};

export { errorHandler };
