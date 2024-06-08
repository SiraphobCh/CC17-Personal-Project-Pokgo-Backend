const errorMiddleware = (error, req, res, next) => {
  console.log(error);

  res.status(error.statusCode || 500).json({ message: error.message, field: error.field });
};

module.exports = errorMiddleware;
