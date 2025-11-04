import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, User, LogOut, LayoutDashboard, MapPin, Search, Menu, X, Bell } from 'lucide-react';

export default function Navigation() {
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header-fixed">
      <nav className="border-b border-gray-200">
        <div className="container mx-auto px-5">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <span className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                  Ophelia AI
                </span>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                <Link
                  to="/marketplace"
                  className="text-gray-600 hover:text-yellow-600 font-medium transition-colors link-underline"
                >
                  Marketplace
                </Link>
                <Link
                  to="/find-artisans"
                  className="flex items-center space-x-1 text-gray-600 hover:text-yellow-600 font-medium transition-colors link-underline"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Artisans</span>
                </Link>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-yellow-600 font-medium transition-colors link-underline"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-yellow-600 font-medium transition-colors link-underline"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/notifications"
                    className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                  </Link>
                  
                  {profile?.role === 'artisan' && (
                    <Link
                      to="/artisan/dashboard"
                      className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors link-underline"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  
                  {profile?.role === 'customer' && (
                    <Link
                      to="/cart"
                      className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors link-underline"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Cart</span>
                    </Link>
                  )}

                  <Link
                    to={profile?.role === 'artisan' ? '/artisan/profile' : '/profile'}
                    className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors link-underline cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">{profile?.full_name || 'User'}</span>
                  </Link>

                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors link-underline"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-yellow-600 font-medium transition-colors link-underline"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="space-y-4">
                <Link
                  to="/marketplace"
                  className="block text-gray-600 hover:text-yellow-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Marketplace
                </Link>
                <Link
                  to="/find-artisans"
                  className="block text-gray-600 hover:text-yellow-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Artisans
                </Link>
                <Link
                  to="/about"
                  className="block text-gray-600 hover:text-yellow-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-600 hover:text-yellow-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                {user ? (
                  <div className="border-t border-gray-200 pt-4 space-y-4">
                    {profile?.role === 'artisan' && (
                      <Link
                        to="/artisan/dashboard"
                        className="block text-gray-600 hover:text-yellow-600 font-medium transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    {profile?.role === 'customer' && (
                      <Link
                        to="/cart"
                        className="block text-gray-600 hover:text-yellow-600 font-medium transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Cart
                      </Link>
                    )}
                    <Link
                      to={profile?.role === 'artisan' ? '/artisan/profile' : '/profile'}
                      className="block text-gray-600 hover:text-yellow-600 font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="block text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 pt-4 space-y-4">
                    <Link
                      to="/login"
                      className="block text-gray-600 hover:text-yellow-600 font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block text-center btn-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
