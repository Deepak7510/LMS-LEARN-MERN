const handleGlobalError = (err, req, res, next) => {
  const message = err.message || "Internal server Error.";
  const statusCode = err.statusCode || 500;
  const success = err.success || false;
  const data = err.data || null;

  return res.status(statusCode).json({
    statusCode,
    success,
    message,
    data,
  });
};

export default handleGlobalError;
