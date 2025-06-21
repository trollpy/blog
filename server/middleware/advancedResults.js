const advancedResults = (model, populate = []) => async (req, res, next) => {
  try {
    const reqQuery = { ...req.query };
    
    // Convert 'me' to logged-in user's ID for ObjectId fields
    if (reqQuery.author === 'me') {
      if (req.user) {
        reqQuery.author = req.user.id;
      } else {
        // If 'me' is requested but user is not authenticated, return empty result
        return res.status(401).json({
          success: false,
          error: 'Authentication required to view your posts'
        });
      }
    }
    
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string with MongoDB operators
    let queryStr = JSON.stringify(reqQuery).replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`
    );
    
    let query = model.find(JSON.parse(queryStr));
    
    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page  = parseInt(req.query.page, 10)  || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip  = (page - 1) * limit;
    const total = await model.countDocuments(JSON.parse(queryStr));
    
    query = query.skip(skip).limit(limit);
    
    // Populate related fields (e.g., author, category)
    if (populate.length) {
      populate.forEach(pop => {
        query = query.populate(pop);
      });
    }
    
    const results = await query;
    
    const pagination = {};
    if (skip + limit < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (skip > 0) {
      pagination.prev = { page: page - 1, limit };
    }
    
    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results
    };
    
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = advancedResults;