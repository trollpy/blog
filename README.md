# 📝 MERN Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring JWT authentication, rich text editing, and responsive design.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=JSON%20web%20tokens)

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** - Secure, stateless user sessions
- **User registration and login** - Complete auth flow with validation
- **Protected routes** - Role-based access control
- **Password encryption** - Bcrypt hashing for security
- **Auto token refresh** - Seamless user experience

### 📚 Blog Functionality
- **Create, Read, Update, Delete posts** - Full CRUD operations
- **Rich text editor** - Markdown support with live preview
- **Image uploads** - Cloudinary integration for media storage
- **Categories and tags** - Organize content efficiently
- **Search functionality** - Find posts by title, content, or tags
- **Pagination** - Optimized loading for large datasets

### 👥 User Features
- **User profiles** - Customizable author pages
- **Comments system** - Engage with readers
- **Like/Unlike posts** - Social interaction features
- **Author dashboard** - Manage your content
- **Reading history** - Track user engagement

### 🎨 UI/UX
- **Responsive design** - Mobile-first approach
- **Dark/Light theme** - User preference settings
- **Modern UI components** - Clean, intuitive interface
- **Loading states** - Smooth user experience
- **Error handling** - User-friendly error messages

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/trollpy/blog.git
   cd blog
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the server directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-here

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Email Configuration (for notifications)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

   Create `.env` file in the client directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
   ```

5. **Start the application**
   
   **Development mode (runs both server and client):**
   ```bash
   # From the root directory
   npm run dev
   ```

   **Or run separately:**
   ```bash
   # Terminal 1 - Server
   cd server
   npm run dev

   # Terminal 2 - Client
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

## 📁 Project Structure

```
mern-blog/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── common/     # Shared components
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── blog/       # Blog-specific components
│   │   │   └── layout/     # Layout components
│   │   ├── context/        # React Context API
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # CSS/SCSS files
│   │   └── App.js          # Main App component
│   ├── package.json
│   └── ...
├── server/                 # Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── uploads/            # File uploads (if not using cloud storage)
│   ├── server.js           # Main server file
│   ├── package.json
│   └── ...
├── README.md
└── package.json            # Root package.json for scripts
```

## 🔧 API Endpoints

### Authentication
```
POST   /api/auth/register    # User registration
POST   /api/auth/login       # User login
POST   /api/auth/logout      # User logout
GET    /api/auth/me          # Get current user
PUT    /api/auth/profile     # Update user profile
POST   /api/auth/forgot      # Forgot password
POST   /api/auth/reset       # Reset password
```

### Blog Posts
```
GET    /api/posts            # Get all posts (with pagination)
GET    /api/posts/:id        # Get single post
POST   /api/posts            # Create new post (auth required)
PUT    /api/posts/:id        # Update post (auth required)
DELETE /api/posts/:id        # Delete post (auth required)
GET    /api/posts/search     # Search posts
GET    /api/posts/category/:category  # Get posts by category
```

### Comments
```
GET    /api/posts/:id/comments     # Get post comments
POST   /api/posts/:id/comments     # Add comment (auth required)
PUT    /api/comments/:id           # Update comment (auth required)
DELETE /api/comments/:id           # Delete comment (auth required)
```

### User Management
```
GET    /api/users/profile/:id      # Get user profile
PUT    /api/users/profile          # Update profile (auth required)
GET    /api/users/posts            # Get user's posts (auth required)
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **React Markdown** - Markdown rendering
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization
- **Nodemailer** - Email sending
- **Express Validator** - Input validation

### Development Tools
- **Nodemon** - Development server auto-restart
- **Concurrently** - Run multiple commands simultaneously
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test

# Run all tests
npm test
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop (1024px and up)
- 🖥️ Large screens (1200px and up)

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt encryption
- **Input Validation** - Server-side validation
- **CORS Protection** - Cross-origin request security
- **Rate Limiting** - Prevent abuse
- **XSS Protection** - Cross-site scripting prevention
- **Environment Variables** - Sensitive data protection

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables in your hosting dashboard

### Backend (Heroku/Railway/DigitalOcean)
1. Set up your production database (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy using your preferred service

### Database (MongoDB Atlas)
1. Create a cluster on MongoDB Atlas
2. Get your connection string
3. Update your `MONGODB_URI` environment variable

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
Tshivhenga Thompho Sheriff

## 🙏 Acknowledgments

- [MERN Stack Documentation](https://www.mongodb.com/mern-stack)
- [JWT.io](https://jwt.io/) for JWT resources
- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

⭐ **Star this repository if it helped you!**