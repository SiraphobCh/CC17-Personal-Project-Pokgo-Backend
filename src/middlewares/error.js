const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');

const errorMiddleware = (error, req, res, next) => {
  console.log(error);

  if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
    error.statusCode = 401;
  }

  res.status(error.statusCode || 500).json({ message: error.message, field: error.field });
};

module.exports = errorMiddleware;
