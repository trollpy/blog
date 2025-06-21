import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-3">
            <div className="w-8 h-8 bg-stone-900 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold tracking-tight text-stone-900">
                Code & Chaos
              </span>
              <span className="text-xs font-medium text-stone-500 tracking-widest uppercase">
                Development Journal
              </span>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive 
                    ? 'text-stone-900 border-b-2 border-stone-900 pb-1' 
                    : 'text-stone-600 hover:text-stone-900'
                }`
              }
            >
              Home
            </NavLink>
            
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition-colors duration-200 ${
                      isActive 
                        ? 'text-stone-900 border-b-2 border-stone-900 pb-1' 
                        : 'text-stone-600 hover:text-stone-900'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                
                <NavLink
                  to="/posts/new"
                  className="px-4 py-2 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 transition-colors duration-200 rounded-sm"
                >
                  New Post
                </NavLink>
                
                <button
                  onClick={logout}
                  className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                >
                  Sign Out
                </button>
                
                <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-stone-200">
                  <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-stone-900">
                    {user?.name || 'User'}
                  </span>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                >
                  Sign In
                </NavLink>
                
                <NavLink
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 transition-colors duration-200 rounded-sm"
                >
                  Get Started
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;