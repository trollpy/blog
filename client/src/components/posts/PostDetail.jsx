import { format } from 'date-fns';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';

const PostDetail = ({ post }) => {
  // Function to safely render content with proper paragraph structure
  const renderContent = (content) => {
    if (!content) return null;
    
    // First, decode HTML entities
    const decodeHtmlEntities = (str) => {
      const entityMap = {
        'x27;': "'",
        'quot;': '"',
        'amp;': '&',
        'lt;': '<',
        'gt;': '>',
        'nbsp;': ' ',
        'x2F;': '/',
        'x28;': '(',
        'x29;': ')',
        'x3A;': ':',
        'x3B;': ';',
        'x2C;': ',',
        'x21;': '!',
        'x3F;': '?',
        'x2D;': '-',
        'x2E;': '.',
        '#39;': "'",
        '#34;': '"'
               
      };
      
      let decoded = str;
      Object.keys(entityMap).forEach(entity => {
        const regex = new RegExp(entity, 'g');
        decoded = decoded.replace(regex, entityMap[entity]);
      });
      
      return decoded;
    };
    
    // Decode the content first
    const decodedContent = decodeHtmlEntities(content);
    
    // Split content into meaningful paragraphs
    // Look for natural paragraph breaks or create them based on sentence patterns
    let paragraphs = [];
    
    // Try splitting by double line breaks first
    let initialSplit = decodedContent.split(/\n\n|\r\n\r\n/).filter(p => p.trim());
    
    // If no double line breaks, split by single line breaks and group sentences
    if (initialSplit.length === 1) {
      const sentences = decodedContent.split(/(?<=[.!?])\s+/);
      let currentParagraph = '';
      
      sentences.forEach((sentence, index) => {
        currentParagraph += sentence + ' ';
        
        // Start new paragraph every 3-4 sentences or at logical breaks
        if ((index + 1) % 3 === 0 || 
            sentence.includes('Here are') || 
            sentence.includes('Months') ||
            sentence.includes('The ') && sentence.length < 50) {
          paragraphs.push(currentParagraph.trim());
          currentParagraph = '';
        }
      });
      
      // Add remaining content as last paragraph
      if (currentParagraph.trim()) {
        paragraphs.push(currentParagraph.trim());
      }
    } else {
      paragraphs = initialSplit;
    }
    
    return paragraphs.map((paragraph, index) => {
      const cleanParagraph = paragraph.trim();
      
      if (index === 0) {
        // First paragraph with drop cap
        return (
          <p key={index} className="text-xl leading-relaxed mb-6">
            <span className="float-left text-6xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text leading-none mr-2 mt-2">
              {cleanParagraph.charAt(0)}
            </span>
            {cleanParagraph.substring(1)}
          </p>
        );
      }
      
      // Check if this looks like a heading
      if (cleanParagraph.length < 80 && 
          (cleanParagraph.includes('Month') || 
           cleanParagraph.endsWith(':') ||
           cleanParagraph.match(/^[A-Z][^.]*[^.]$/))) {
        return (
          <h3 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
            {cleanParagraph}
          </h3>
        );
      }
      
      return (
        <p key={index} className="text-lg leading-relaxed mb-6 text-gray-100">
          {cleanParagraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
       <div className="pt-"> 
        
        {/* Hero Section with Featured Image */}
        <div className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: post.featuredImage 
              ? `url(/uploads/${post.featuredImage})` 
              : `url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80)`
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-6 pb-16">
            <div className="max-w-4xl">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  {post.category?.name || 'Technology'}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {post.author?.name?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <p className="font-medium text-white">{post.author?.name || 'Anonymous'}</p>
                    <p className="text-sm text-white/60">Tech Writer</p>
                  </div>
                </div>
                <div className="hidden md:block w-px h-8 bg-white/20"></div>
                <div className="flex items-center space-x-2 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div> {/* End navbar spacing control */}
      </div>

      {/* Article Content */}
      <div className="relative -mt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Main Content Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 md:p-12">
                {/* Article Content */}
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="text-gray-100 leading-relaxed font-light tracking-wide">
                    {/* Render properly structured content */}
                    {post.content ? (
                      renderContent(post.content)
                    ) : (
                      <div>
                        <p className="text-xl leading-relaxed mb-6">
                          <span className="float-left text-6xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text leading-none mr-2 mt-2">
                            T
                          </span>
                          his is where your amazing tech article content would go. The content should be engaging, informative, and well-structured to provide maximum value to your readers.
                        </p>
                        <p className="text-lg leading-relaxed mb-6 text-gray-100">
                          Each paragraph will be properly formatted with appropriate spacing and typography. The content will maintain readability while looking professional and modern.
                        </p>
                        <p className="text-lg leading-relaxed mb-6 text-gray-100">
                          Your actual blog content will replace this placeholder text and will be automatically formatted into clean, readable paragraphs.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags Section */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="text-white text-sm font-medium mb-4 uppercase tracking-wider">Topics</h3>
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-sm font-medium uppercase tracking-wider">Share this article</h3>
                    <div className="flex space-x-4">
                      <button className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </button>
                      <button className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </button>
                      <button className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Discussion
                </h2>
                <div className="space-y-6">
                  <CommentList comments={post.comments} />
                  <CommentForm postId={post._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default PostDetail;