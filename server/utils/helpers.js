exports.paginateResults = model => async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  const results = {};

  if (endIndex < total) {
    results.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit
    };
  }

  try {
    results.results = await model.find().limit(limit).skip(startIndex);
    res.paginatedResults = results;
    next();
  } catch (err) {
    next(err);
  }
};