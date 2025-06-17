require('dotenv').config();
// console.log('PORT:', process.env.PORT);
// console.log('NODE_ENV:', process.env.NODE_ENV);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
// Removed express-mongo-sanitize & xss-clean since you have custom sanitize
const hpp = require('hpp');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Database connection
const connectDB = require('./config/database');
connectDB();

// Middleware

const corsOptions = {
  origin: 'http://localhost:5173', //vite dev server
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());

// Helper to check plain object
const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val);

// MongoDB sanitization - safer implementation with guards & debug logs
app.use((req, res, next) => {
  console.log('Before sanitize, req.body =', req.body);

  if (isObject(req.body)) {
    req.body = JSON.parse(JSON.stringify(req.body, (key, value) => {
      if (typeof value === 'string') {
        return value.replace(/\$/g, '').replace(/\./g, '');
      }
      return value;
    }));
  }

  if (isObject(req.query)) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = req.query[key].replace(/\$/g, '').replace(/\./g, '');
      }
    });
  }

  if (isObject(req.params)) {
    Object.keys(req.params).forEach(key => {
      if (typeof req.params[key] === 'string') {
        req.params[key] = req.params[key].replace(/\$/g, '').replace(/\./g, '');
      }
    });
  }

  next();
});

// XSS protection - your existing custom implementation
app.use((req, res, next) => {
  const sanitizeString = (str) => {
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const sanitizeObject = (obj) => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    } else if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    } else if (obj && typeof obj === 'object') {
      const sanitized = {};
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    }
    return obj;
  };

  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
});

app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/comments', require('./routes/comments'));

// API root route to handle /api requests
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Blog API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      categories: '/api/categories',
      comments: '/api/comments'
    }
  });
});

// Root route to handle base URL
app.get('/', (req, res) => {
  res.json({ 
    message: 'Blog API Server Running',
    status: 'active',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      categories: '/api/categories',
      comments: '/api/comments'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`);
});