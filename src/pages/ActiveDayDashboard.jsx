import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight, DollarSign, Route, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';
import AddTripModal from '../components/AddTripModal';
import StatCard from '../components/StatCard';
import ActiveTrip from '../components/ActiveTrip';

const ActiveDayDashboard = () => {
  const [activeDay, setActiveDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const day = JSON.parse(localStorage.getItem('activeDay'));
    if (day) {
      setActiveDay(day);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleAddTrip = (newTrip) => {
    const updatedDay = {
      ...activeDay,
      trips: [...activeDay.trips, newTrip],
    };
    setActiveDay(updatedDay);
    localStorage.setItem('activeDay', JSON.stringify(updatedDay));
  };

  const handleCompleteTrip = (tripId, kilometers) => {
    const updatedTrips = activeDay.trips.map(trip => {
      if (trip.id === tripId) {
        const km = parseFloat(kilometers);
        let earnings = 0;
        if (trip.type === 'pickup') {
          earnings = 15 + km * 5;
        } else {
          earnings = 10 + km * 5;
        }
        return { ...trip, completed: true, endTime: new Date().toISOString(), kilometers: km, earnings };
      }
      return trip;
    });
    const updatedDay = { ...activeDay, trips: updatedTrips };
    setActiveDay(updatedDay);
    localStorage.setItem('activeDay', JSON.stringify(updatedDay));
  };

  if (!activeDay) {
    return <div>Loading...</div>;
  }

  const completedTrips = activeDay.trips.filter(t => t.completed);
  const activeTrips = activeDay.trips.filter(t => !t.completed);

  const totalEarnings = completedTrips.reduce((sum, trip) => sum + trip.earnings, 0);
  const totalKilometers = completedTrips.reduce((sum, trip) => sum + trip.kilometers, 0);
  const pickupCount = completedTrips.filter(trip => trip.type === 'pickup').length;
  const dropoffCount = completedTrips.filter(trip => trip.type === 'drop-off').length;

  return (
    <div>
      <div className="mb-6 md:mb-8 p-4 md:p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Welcome, {activeDay.driverName}!</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">Day started at: {new Date(activeDay.startTime).toLocaleTimeString()}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Trips" value={completedTrips.length} icon={<CheckCircle size={28} className="text-green-600" />} />
        <StatCard title="Earnings" value={`₹${totalEarnings.toFixed(2)}`} icon={<DollarSign size={28} className="text-green-600" />} />
        <StatCard title="Kilometers" value={`${totalKilometers.toFixed(2)} km`} icon={<Route size={28} className="text-blue-600" />} />
        <StatCard title="Pickup/Drop-off" value={`${pickupCount} / ${dropoffCount}`} icon={<TrendingUp size={28} className="text-purple-600" />} />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Trips</h2>
        <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transform hover:scale-105 transition-all shadow-lg">
          <Plus size={20} />
          <span className="text-sm md:text-base">Create New Trip</span>
        </button>
      </div>

      <div className="mb-6 md:mb-10 bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Active Trips</h3>
        {activeTrips.length > 0 ? (
          <div className="space-y-4">
            {activeTrips.map(trip => (
              <ActiveTrip key={trip.id} trip={trip} onComplete={handleCompleteTrip} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4 text-sm md:text-base">No active trips.</p>
        )}
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Completed Trips</h3>
        {completedTrips.length > 0 ? (
          <div className="rounded-xl">
            <ul className="divide-y divide-gray-200">
              {completedTrips.map((trip) => (
                <li key={trip.id} className="py-3 md:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <p className="font-semibold text-base md:text-lg text-gray-800">{trip.title}</p>
                    <p className="text-sm md:text-md text-gray-500">{trip.kilometers} km - <span className="capitalize">{trip.type}</span></p>
                  </div>
                  <p className="font-bold text-lg md:text-xl text-green-600">+₹{trip.earnings.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4 text-sm md:text-base">No completed trips yet.</p>
        )}
      </div>

      <div className="mt-8 md:mt-12 flex justify-center sm:justify-end">
        <button onClick={() => navigate('/end-day')} className="w-full sm:w-auto bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:via-orange-700 hover:to-red-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg flex items-center justify-center space-x-2 text-base md:text-xl transform hover:scale-105 transition-all shadow-lg">
          <span>End Day</span>
          <ArrowRight size={20} className="md:w-6 md:h-6" />
        </button>
      </div>
      <AddTripModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTrip={handleAddTrip} />
    </div>
  );
};

export default ActiveDayDashboard;
