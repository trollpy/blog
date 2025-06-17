import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20">
      {/* Glassmorphism background with noise texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-white/10 to-slate-800/5 backdrop-blur-2xl border-b border-white/10">
        <div className="absolute inset-0 bg-noise opacity-[0.015]"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="group flex items-center space-x-3"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 rounded-xl shadow-2xl group-hover:shadow-indigo-500/25 transition-all duration-500 flex items-center justify-center">
              <div className="w-6 h-6 bg-white/90 rounded-md"></div>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
              Code & Chaos
            </span>
            <span className="text-xs font-medium text-slate-500 -mt-0.5 tracking-wide">
              DEVELOPMENT BLOG
            </span>
          </div>
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                isActive 
                  ? 'text-indigo-600 bg-indigo-50/80 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`
            }
          >
            Home
            {({ isActive }) => isActive && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"></div>
            )}
          </NavLink>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-1 ml-6">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive 
                      ? 'text-indigo-600 bg-indigo-50/80 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`
                }
              >
                Dashboard
              </NavLink>
              
              {/* Add Create Post link */}
              <NavLink
                to="/posts/new"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
              >
                New Post
              </NavLink>
              
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50/50 transition-all duration-300 rounded-lg"
              >
                Sign Out
              </button>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-slate-200/50">
                <div className="relative group">
                  {/* Avatar with fallback to initials */}
                  {user?.avatar && user.avatar !== 'default.jpg' ? (
                    <img
                      src={`/uploads/${user.avatar}`}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white/50 shadow-lg group-hover:ring-indigo-200 transition-all duration-300"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Initials fallback */}
                  <div 
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-white/50 shadow-lg group-hover:ring-indigo-200 transition-all duration-300"
                    style={{ display: (!user?.avatar || user.avatar === 'default.jpg') ? 'flex' : 'none' }}
                  >
                    <span className="text-sm font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-800 leading-tight">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-xs text-slate-500 leading-tight capitalize">
                    {user?.role || 'user'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 ml-6">
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/50 transition-all duration-300 rounded-lg"
              >
                Sign In
              </NavLink>
              
              <NavLink
                to="/register"
                className="relative group px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative">Get Started</span>
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;