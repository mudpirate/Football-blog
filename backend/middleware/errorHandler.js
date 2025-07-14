export const errorHandler = async (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
