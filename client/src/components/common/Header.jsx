import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-elegant">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-3">
            <div className="w-9 h-9 bg-stone-900 rounded-lg flex items-center justify-center group-hover:bg-stone-800 transition-colors duration-200">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-serif font-bold tracking-tight text-stone-900">
                Code & Chaos
              </span>
              <span className="text-xs font-medium text-stone-500 tracking-widest uppercase">
                Development Journal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
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
               
                <button
                  onClick={logout}
                  className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200"
                >
                  Sign Out
                </button>
               
                <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-stone-200 group relative">
                  <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden xl:block">
                    <span className="text-sm font-medium text-stone-900">
                      {user?.name || 'User'}
                    </span>
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-stone-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-2">
                      <NavLink
                        to="/posts/new"
                        className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors duration-150"
                      >
                        New Post
                      </NavLink>
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors duration-150"
                      >
                        My Posts
                      </NavLink>
                      <div className="border-t border-stone-200 my-1"></div>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors duration-150"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden w-8 h-8 flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center">
              <span className={`w-4 h-0.5 bg-stone-700 rounded-full transition-all duration-200 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`w-4 h-0.5 bg-stone-700 rounded-full transition-all duration-200 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-4 h-0.5 bg-stone-700 rounded-full transition-all duration-200 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-200 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-3 border border-stone-200/50">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-base font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-stone-900 bg-stone-50'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`
              }
            >
              Home
            </NavLink>
           
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-base font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-stone-900 bg-stone-50'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
               
                <NavLink
                  to="/posts/new"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors duration-150"
                >
                  New Post
                </NavLink>
               
                <div className="px-4 py-2 flex items-center space-x-3 border-t border-stone-200 mt-2 pt-3">
                  <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-base font-medium text-stone-900">
                    {user?.name || 'User'}
                  </span>
                </div>
               
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors duration-150"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors duration-150"
                >
                  Sign In
                </NavLink>
               
                <NavLink
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mx-4 my-2 px-4 py-2 text-base font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-sm transition-colors duration-150"
                >
                  Get Started
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;