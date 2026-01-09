import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, List, PlusCircle, Bike, Menu, X } from 'lucide-react';

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 md:pb-0">
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-5">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-1.5 md:p-2 rounded-lg shadow-lg">
                <Bike size={24} className="text-white md:w-7 md:h-7" strokeWidth={2.5} />
              </div>
              <h1 className="text-xl md:text-3xl font-bold tracking-wider bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                RideLog Pro
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink to="/" className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                <Home size={22} />
                <span>Start Day</span>
              </NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                <PlusCircle size={22} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/previous-logs" className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                <List size={22} />
                <span>Previous Logs</span>
              </NavLink>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${isActive ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Home size={20} />
                <span>Start Day</span>
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${isActive ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <PlusCircle size={20} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/previous-logs"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${isActive ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <List size={20} />
                <span>Previous Logs</span>
              </NavLink>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 md:py-10 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 z-50">
        <div className="flex justify-around items-center py-3">
          <NavLink
            to="/"
            className={({ isActive }) => `flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${isActive ? 'text-orange-400' : 'text-gray-400'}`}
          >
            <Home size={24} />
            <span className="text-xs font-medium">Start</span>
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${isActive ? 'text-orange-400' : 'text-gray-400'}`}
          >
            <PlusCircle size={24} />
            <span className="text-xs font-medium">Dashboard</span>
          </NavLink>
          <NavLink
            to="/previous-logs"
            className={({ isActive }) => `flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${isActive ? 'text-orange-400' : 'text-gray-400'}`}
          >
            <List size={24} />
            <span className="text-xs font-medium">Logs</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
