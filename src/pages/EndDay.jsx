import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fuel } from 'lucide-react';
import { createDayLog } from '../utils/api';

const EndDay = () => {
  const [fuelExpense, setFuelExpense] = useState('');
  const navigate = useNavigate();

  const handleEndDay = () => {
    const expense = parseFloat(fuelExpense);
    if (isNaN(expense)) {
      alert('Please enter a valid fuel expense. Enter 0 if you had none.');
      return;
    }

    if (window.confirm('Are you sure you want to end your day and save this log? This action cannot be undone.')) {
      const activeDay = JSON.parse(localStorage.getItem('activeDay'));
      if (!activeDay) {
        navigate('/');
        return;
      }

      const completedTrips = activeDay.trips.filter(t => t.completed);
      const totalEarnings = completedTrips.reduce((sum, trip) => sum + trip.earnings, 0);
      const totalKilometers = completedTrips.reduce((sum, trip) => sum + trip.kilometers, 0);
      const pickupCount = completedTrips.filter(trip => trip.type === 'pickup').length;
      const dropoffCount = completedTrips.filter(trip => trip.type === 'drop-off').length;

      const finalDayLog = {
        id: Date.now(),
        driverName: activeDay.driverName,
        date: new Date().toISOString().split('T')[0],
        startTime: activeDay.startTime,
        endTime: new Date().toISOString(),
        fuelExpense: expense,
        totalKilometers,
        totalEarnings,
        pickupCount,
        dropoffCount,
        trips: completedTrips,
      };

      // Save to backend
      createDayLog(finalDayLog)
        .then(() => {
          // Save to localStorage
          const allDayLogs = JSON.parse(localStorage.getItem('allDayLogs')) || [];
          localStorage.setItem('lastDayLog', JSON.stringify(finalDayLog));
          localStorage.setItem('allDayLogs', JSON.stringify([...allDayLogs, finalDayLog]));
          localStorage.removeItem('activeDay');
          navigate('/logbook');
        })
        .catch(err => {
          console.error(err);
          alert('Failed to save day log. Please try again.');
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-16 relative overflow-hidden min-h-[calc(100vh-200px)]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 opacity-70"></div>

      {/* Floating circles for depth */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-md text-center relative z-10 border border-white/40">
        {/* Glassmorphism gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent pointer-events-none rounded-3xl"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-orange-600 p-3 md:p-4 rounded-full shadow-2xl">
                <Fuel size={40} className="text-white relative md:w-14 md:h-14" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-gray-900 drop-shadow-sm">
            Finalize Your Day
          </h2>
          <p className="text-gray-800 mb-6 md:mb-8 text-sm md:text-lg font-medium drop-shadow-sm">
            Enter your total fuel expense to complete the log.
          </p>

          <div className="mb-6">
            <input
              type="number"
              id="fuelExpense"
              value={fuelExpense}
              onChange={(e) => setFuelExpense(e.target.value)}
              className="w-full px-5 py-4 text-lg bg-white/50 backdrop-blur-md border-2 border-white/60 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all placeholder-gray-600 text-gray-900 shadow-lg font-medium"
              placeholder="e.g., 45.50"
            />
            <p className="text-sm text-gray-700 mt-3 font-medium drop-shadow-sm">
              Fuel can be zero.
            </p>
          </div>

          <button
            onClick={handleEndDay}
            className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:via-orange-700 hover:to-red-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl text-base md:text-lg lg:text-xl transform hover:scale-105 transition-all shadow-lg hover:shadow-2xl border border-white/30"
          >
            End Day & Generate Log
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default EndDay;
