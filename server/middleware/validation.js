const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(
        errors
          .array()
          .map(err => err.msg)
          .join(', '),
        422
      )
    );
  }

  next();
};