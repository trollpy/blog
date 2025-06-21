const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Post = require('./models/Post'); // Adjust path to your Post model
const Category = require('./models/Category'); // Adjust path to your Category model
const User = require('./models/User'); // Adjust path to your User model

dotenv.config({ path: './.env' });

const articles = [
  {
    title: 'Building Dynamic Forms with React Hook Form in MERN Applications',
    slug: 'react-hook-form-mern-dynamic-forms',
    author: 'Form Master',
    category: 'Frontend Development',
    excerpt: 'Master form validation, error handling, and dynamic field management using React Hook Form in your MERN stack applications.',
    content: `React Hook Form has revolutionized form handling in React applications by providing performant, flexible, and intuitive form validation with minimal re-renders. In MERN stack applications, where forms serve as the primary interface between users and your MongoDB database, implementing robust form handling patterns becomes critical for both user experience and data integrity.

The foundation of effective form management begins with proper validation strategies that provide immediate feedback while maintaining optimal performance. React Hook Form's built-in validation system eliminates the need for complex state management patterns while supporting both synchronous and asynchronous validation rules. This approach scales naturally from simple contact forms to complex multi-step wizards with conditional fields and dynamic validation requirements.

File upload handling represents one of the most challenging aspects of form implementation in MERN applications. The combination of client-side preview generation, progress tracking, and server-side validation requires careful coordination between frontend and backend systems. Modern implementations leverage FileReader APIs for immediate preview generation while implementing robust error handling for file size limits, type restrictions, and upload failures.

Dynamic category loading demonstrates the power of combining React Hook Form with external API calls. Rather than hardcoding form options, modern applications fetch available categories, tags, and other metadata from the database in real-time. This approach ensures form options remain synchronized with backend data while providing loading states and error handling that maintain usable interfaces even when API calls fail.

The integration between React Hook Form and custom validation functions enables sophisticated business logic validation that goes beyond simple required field checks. Custom validators can verify unique usernames, validate complex password requirements, or ensure uploaded files meet specific criteria before form submission. These validators integrate seamlessly with the form's error handling system while providing clear, actionable feedback to users.

Tag management in blog applications showcases advanced form handling patterns where string inputs transform into structured arrays through custom onChange handlers. The ability to parse comma-separated values, validate individual tags, and provide real-time feedback creates intuitive interfaces that guide users toward correct input formats while maintaining flexibility for different use cases.

Form state management becomes particularly important in applications with autosave functionality, where draft posts need periodic persistence without interfering with user interactions. React Hook Form's uncontrolled component approach minimizes re-renders while providing precise control over when validation occurs and how error states are displayed.

The relationship between form validation and API error handling creates a comprehensive error management system where client-side validation prevents obviously invalid submissions while server-side validation catches edge cases and provides authoritative validation for business rules that require database access. This layered approach ensures data integrity while providing responsive user experiences.

Production-ready form implementations require consideration of accessibility standards, keyboard navigation, screen reader compatibility, and internationalization support. React Hook Form's integration with popular UI libraries enables consistent styling and behavior while maintaining semantic HTML structure that works effectively with assistive technologies.`,
    tags: ['React Hook Form', 'Forms', 'Validation', 'MERN'],
    featuredImage: 'form-validation.jpg',
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Advanced File Upload Patterns in MERN Stack Applications',
    slug: 'advanced-file-upload-mern-patterns',
    author: 'Upload Specialist',
    category: 'Fullstack Development',
    excerpt: 'Implement secure, scalable file upload systems with image previews, progress tracking, and cloud storage integration.',
    content: `File upload functionality in MERN applications extends far beyond simple form submissions to encompass security considerations, storage optimization, user experience enhancements, and scalability planning. Modern web applications require sophisticated upload systems that handle multiple file types, provide real-time feedback, and integrate seamlessly with cloud storage providers while maintaining security boundaries.

Client-side file handling begins with the FileReader API, which enables immediate preview generation without server round-trips. This capability transforms user experience by providing instant visual feedback for image uploads while enabling client-side validation that prevents obviously invalid files from consuming bandwidth and server resources. The FileReader approach scales to handle multiple file selections while maintaining responsive interfaces.

Image preview generation requires careful consideration of memory management and performance optimization, particularly when handling large files or multiple simultaneous uploads. Modern implementations combine thumbnail generation with progressive enhancement techniques that provide immediate feedback for small images while gracefully handling larger files through background processing and lazy loading strategies.

Server-side upload handling involves multiple layers of validation, from file type verification and size limits to malware scanning and content analysis. Express.js middleware like multer provides the foundation for file processing while enabling custom validation logic that integrates with your application's business rules. Proper error handling ensures upload failures provide actionable feedback rather than generic error messages.

Cloud storage integration transforms local file uploads into scalable, globally distributed systems that handle traffic spikes and provide content delivery network benefits automatically. Services like AWS S3, Cloudinary, and Google Cloud Storage offer different tradeoffs between cost, features, and integration complexity that affect architectural decisions throughout your application.

Security considerations for file uploads encompass multiple attack vectors including file type spoofing, executable file uploads, and denial-of-service attacks through large file submissions. Comprehensive security strategies combine client-side validation, server-side verification, content type detection, and sandboxed storage locations that prevent uploaded files from executing on your server infrastructure.

Progress tracking and upload resumption capabilities become essential for large files or applications serving users with unreliable internet connections. Modern implementations leverage XMLHttpRequest progress events or fetch API streams to provide real-time upload feedback while implementing retry logic that handles network interruptions gracefully.

File organization and metadata management enable advanced features like image galleries, document libraries, and media management systems. Database schemas that track file relationships, access permissions, and usage analytics provide the foundation for sophisticated content management while enabling cleanup processes that remove orphaned files and optimize storage costs.

The integration between file uploads and form validation systems requires careful coordination to ensure file-related errors integrate seamlessly with other form validation feedback. Users should receive consistent error messaging and recovery options whether validation failures originate from text fields, file uploads, or server-side business logic validation.`,
    tags: ['File Upload', 'Multer', 'Cloud Storage', 'Security'],
    featuredImage: 'file-upload-system.jpg',
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Mastering MongoDB Data Relationships in Blog Applications',
    slug: 'mongodb-data-relationships-blog-applications',
    author: 'Database Architect',
    category: 'Backend Development',
    excerpt: 'Design efficient database schemas for blog applications with proper relationships between posts, categories, users, and comments.',
    content: `Database schema design in MongoDB-powered blog applications requires balancing between document flexibility and relational integrity to create systems that perform efficiently while maintaining data consistency. Unlike SQL databases with rigid foreign key constraints, MongoDB's document-oriented approach enables multiple strategies for modeling relationships between posts, categories, users, and comments.

The relationship between posts and categories demonstrates fundamental decisions about data normalization versus denormalization in NoSQL systems. Referenced relationships store category IDs in post documents while maintaining separate category collections, enabling dynamic category management and consistent naming across all posts. This approach facilitates category-based queries and administrative functions while requiring population operations for complete post data retrieval.

Embedded relationships offer alternative approaches where category information is duplicated within post documents, eliminating the need for join operations at the cost of potential data inconsistency if category details change. The choice between these patterns depends on update frequency, query patterns, and data consistency requirements that vary significantly between different application architectures.

User relationships with posts involve authentication context, authorization levels, and content ownership that affect both database design and application security. Author information embedded within post documents provides immediate access to creator details while referenced user relationships enable comprehensive user profiles and authentication workflows that scale across multiple content types.

Comment systems showcase hierarchical data modeling challenges where threaded discussions require either embedded arrays for simple comment lists or referenced collections for complex reply structures. Embedded comments provide excellent read performance for displaying post content with associated discussions, while referenced comments enable advanced features like comment moderation, user comment histories, and cross-post comment analytics.

Query optimization in MongoDB blog applications requires understanding how different relationship patterns affect index usage and performance characteristics. Compound indexes on frequently queried field combinations, partial indexes for conditional queries, and text indexes for content search capabilities transform basic CRUD operations into performant systems that handle significant traffic loads.

Data consistency considerations become critical when implementing features like category renaming, user merging, or bulk content operations that affect multiple documents across different collections. MongoDB transactions provide ACID guarantees for multi-document operations while requiring careful consideration of performance implications and design patterns that minimize cross-document dependencies.

Aggregation pipelines unlock advanced analytics and reporting capabilities that leverage document relationships to generate insights about content performance, user engagement, and category popularity. These operations combine data from multiple collections to produce comprehensive reports while maintaining efficient query execution through proper index utilization and pipeline optimization.

Schema evolution strategies ensure blog applications can adapt to changing requirements without major data migrations or application downtime. Flexible document structures accommodate new fields and relationship patterns while maintaining backward compatibility with existing content and user data that may have accumulated over months or years of operation.`,
    tags: ['MongoDB', 'Database Design', 'Relationships', 'Schema'],
    featuredImage: 'mongodb-relationships.jpg',
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Building Responsive Comment Systems with Real-time Updates',
    slug: 'responsive-comment-systems-realtime-updates',
    author: 'Realtime Developer',
    category: 'Fullstack Development',
    excerpt: 'Create engaging comment systems with nested replies, real-time notifications, and optimistic updates for better user experience.',
    content: `Comment systems serve as the engagement backbone of modern blog applications, transforming static content consumption into dynamic community interactions. Implementing responsive comment functionality requires sophisticated coordination between frontend user interfaces, backend data management, and real-time communication systems that provide immediate feedback while maintaining data consistency across multiple concurrent users.

Component architecture for comment systems benefits from recursive rendering patterns that handle nested reply structures elegantly. React components that render themselves recursively create naturally hierarchical comment threads while maintaining clean code organization and predictable rendering behavior. This approach scales from simple flat comment lists to complex threaded discussions without requiring fundamentally different implementation strategies.

State management for comments involves multiple layers of complexity including optimistic updates, real-time synchronization, and conflict resolution when multiple users interact with the same comment thread simultaneously. Optimistic updates provide immediate user feedback by displaying submitted comments before server confirmation, while implementing rollback mechanisms that handle submission failures gracefully.

Real-time comment updates transform static comment sections into live discussion spaces where new comments, replies, and reactions appear immediately for all users viewing the same post. WebSocket connections or Server-Sent Events enable this functionality while requiring careful consideration of connection management, reconnection handling, and message queuing for users with unstable network connections.

Comment validation and moderation systems protect against spam, inappropriate content, and malicious submissions while maintaining smooth user experiences for legitimate interactions. Client-side validation provides immediate feedback for obvious errors while server-side validation enforces business rules and security constraints that prevent database corruption or security vulnerabilities.

Nested reply functionality creates engaging discussion threads while introducing performance considerations for deeply threaded conversations. Database queries that efficiently retrieve hierarchical comment structures, combined with frontend rendering strategies that handle large comment counts, ensure responsive user interfaces even for popular posts with hundreds of comments and replies.

User authentication integration with comment systems enables features like comment ownership verification, edit and delete permissions, and personalized notification systems. Properly implemented authentication ensures users can only modify their own comments while providing clear visual indicators of comment authorship and timestamps that establish discussion context.

Performance optimization for comment systems involves caching strategies, pagination approaches, and lazy loading techniques that maintain responsive interfaces regardless of comment volume. Initial page loads should display recent comments quickly while providing mechanisms to load older comments or expand collapsed reply threads on demand.

Comment notification systems create engagement loops that bring users back to ongoing discussions while avoiding notification fatigue through intelligent filtering and user preference management. Email notifications, in-app alerts, and push notifications each serve different user engagement patterns while requiring careful configuration to respect user privacy and communication preferences.

Moderation tools and reporting mechanisms enable community self-regulation while providing administrators with efficient workflows for handling inappropriate content. Automated content filtering, user reporting systems, and administrative dashboards create comprehensive moderation capabilities that scale with community growth while maintaining healthy discussion environments.`,
    tags: ['Comments', 'Real-time', 'WebSocket', 'Community'],
    featuredImage: 'comment-system.jpg',
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Production-Ready MERN Deployment: From Development to Scale',
    slug: 'production-ready-mern-deployment-guide',
    author: 'DevOps Engineer',
    category: 'DevOps',
    excerpt: 'Deploy MERN applications to production with proper environment configuration, security hardening, and scalability planning.',
    content: `Transitioning MERN applications from development environments to production deployments requires comprehensive planning across security, performance, reliability, and scalability dimensions. Production systems must handle real user traffic, protect sensitive data, recover from failures gracefully, and provide consistent performance under varying load conditions while maintaining cost effectiveness and operational simplicity.

Environment configuration management becomes critical when deploying across development, staging, and production environments with different database connections, API endpoints, and security credentials. Environment variables provide the foundation for this configuration flexibility while requiring secure storage and distribution mechanisms that protect sensitive information like database passwords and API keys from unauthorized access.

Database deployment considerations extend beyond simple connection string changes to encompass backup strategies, connection pooling, and performance monitoring that ensure data reliability and optimal query performance. MongoDB Atlas provides managed database hosting with automatic backups and scaling capabilities, while self-hosted deployments require comprehensive backup automation and monitoring systems.

Frontend deployment strategies must address asset optimization, content delivery, and browser caching policies that minimize load times and bandwidth consumption. Static site generators and content delivery networks transform React applications into globally distributed systems that serve users efficiently regardless of geographic location while providing automatic HTTPS encryption and DDoS protection.

Backend API deployment involves server configuration, process management, and load balancing considerations that ensure reliable service availability. Container orchestration platforms like Docker and Kubernetes provide scalable deployment architectures while requiring expertise in container management and monitoring that may exceed the needs of smaller applications.

Security hardening for production MERN deployments encompasses HTTPS configuration, authentication token security, input validation, and protection against common web vulnerabilities like cross-site scripting and SQL injection attacks. Comprehensive security strategies require regular dependency updates, vulnerability scanning, and penetration testing that identify potential attack vectors before malicious actors discover them.

Performance monitoring and logging systems provide visibility into application behavior under real-world conditions while enabling proactive identification of performance bottlenecks and error conditions. Application performance monitoring tools, log aggregation systems, and alerting mechanisms create comprehensive observability that supports both reactive troubleshooting and proactive optimization efforts.

Scaling strategies for growing MERN applications must consider both horizontal and vertical scaling approaches that accommodate increasing user bases and feature complexity. Database sharding, microservice architectures, and content delivery optimization represent different scaling strategies with distinct complexity and cost implications that require careful evaluation based on actual usage patterns.

Continuous integration and deployment pipelines automate the process of moving code changes from development to production while implementing testing and quality assurance gates that prevent problematic deployments. These systems reduce deployment risk while enabling rapid iteration and feature development that maintains competitive advantages in fast-moving markets.

Cost optimization for production deployments requires understanding the economic implications of different architectural choices and usage patterns. Cloud resource management, database optimization, and feature usage analytics enable informed decisions about infrastructure investments while maintaining service quality and user experience standards.`,
    tags: ['Deployment', 'Production', 'DevOps', 'Scaling'],
    featuredImage: 'production-deployment.jpg',
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const seedArticles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Get categories and users for relationships
    const categories = await Category.find();
    const users = await User.find();

    if (categories.length === 0) {
      console.error('No categories found. Please seed categories first.');
      process.exit(1);
    }

    if (users.length === 0) {
      console.error('No users found. Please create at least one user first.');
      process.exit(1);
    }

    // Clear existing posts
    await Post.deleteMany();

    // Assign random categories and authors to articles
    const articlesWithRefs = articles.map(article => ({
      ...article,
      category: categories[Math.floor(Math.random() * categories.length)]._id,
      author: users[Math.floor(Math.random() * users.length)]._id,
      comments: [] // Initialize empty comments array
    }));

    await Post.insertMany(articlesWithRefs);
    console.log('Articles seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding articles:', err);
    process.exit(1);
  }
};

seedArticles();