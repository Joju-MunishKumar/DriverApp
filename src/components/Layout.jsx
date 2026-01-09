import { NavLink, Outlet } from 'react-router-dom';
import { Home, List, PlusCircle, Bike } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-lg shadow-lg">
                <Bike size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-bold tracking-wider bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                RideLog Pro
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
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
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
