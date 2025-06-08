// middleware/errorMiddleware.js

// Handle 404 - Not Found
export const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 Not Found - ${req.originalUrl}`);
  next(error); // pass to error handler middleware
};

// Centralized Error Handler Middleware
export const errorHandler = (err, req, res, next) => {
  // Use existing status code or default to 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    success: false,
    message: err.message || 'Server Error',
    // Show stack trace only in development mode
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};