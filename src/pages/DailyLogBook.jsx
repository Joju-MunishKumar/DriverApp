import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DollarSign, Route, Fuel, TrendingUp, TrendingDown, ArrowLeft, PlusCircle } from 'lucide-react';
import InfoCard from '../components/InfoCard';
import { getWorkHours } from '../utils/helpers';



const DailyLogBook = () => {
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const allLogs = JSON.parse(localStorage.getItem('allDayLogs')) || [];
      const selectedLog = allLogs.find(l => l.id === Number(id));
      setLog(selectedLog);
      setLoading(false);
    } else {
      const lastLog = JSON.parse(localStorage.getItem('lastDayLog'));
      setLog(lastLog);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!log) {
    return <div>Log not found</div>;
  }

  const pickupBaseEarnings = log.pickupCount * 15;
  const dropoffBaseEarnings = log.dropoffCount * 10;
  const kilometerEarnings = log.totalKilometers * 5;
  const netEarnings = log.totalEarnings - log.fuelExpense;


  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-orange-600 to-amber-700 p-3 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-2xl mb-4 md:mb-6 lg:mb-10 text-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 md:mb-2 break-words">Daily Log for {log.driverName}</h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-xl opacity-90">{new Date(log.date).toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 mb-6 md:mb-10">
        <InfoCard icon={<TrendingUp size={20} className="text-purple-600 md:w-6 md:h-6 lg:w-8 lg:h-8" />} title="Drop-offs">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold">{log.dropoffCount}</p>
        </InfoCard>
        <InfoCard icon={<TrendingDown size={20} className="text-purple-600 md:w-6 md:h-6 lg:w-8 lg:h-8" />} title="Pick-ups">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold">{log.pickupCount}</p>
        </InfoCard>
        <InfoCard icon={<DollarSign size={20} className="text-green-600 md:w-6 md:h-6 lg:w-8 lg:h-8" />} title="Total Earnings">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold">₹{log.totalEarnings.toFixed(2)}</p>
        </InfoCard>
        <InfoCard icon={<Route size={20} className="text-blue-600 md:w-6 md:h-6 lg:w-8 lg:h-8" />} title="Kilometers">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold">{log.totalKilometers} km</p>
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-10">
        <div className="lg:col-span-2 bg-white p-3 md:p-6 lg:p-8 rounded-2xl shadow-xl">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">Day Summary</h3>
          <ul className="space-y-2 md:space-y-3 lg:space-y-4 text-xs md:text-sm lg:text-lg text-gray-600">
            <li className="flex justify-between gap-2"><strong>Work Hours:</strong> <span>{getWorkHours(log.startTime, log.endTime)}</span></li>
            <li className="flex justify-between gap-2"><strong>Fuel Consumed:</strong> <span>₹{log.fuelExpense.toFixed(2)}</span></li>
            <li className="flex justify-between gap-2"><strong>Started Time:</strong> <span className="text-right">{new Date(log.startTime).toLocaleTimeString()}</span></li>
            <li className="flex justify-between gap-2"><strong>Ended Time:</strong> <span className="text-right">{new Date(log.endTime).toLocaleTimeString()}</span></li>
            <li className="flex justify-between gap-2"><strong>Total Trips:</strong> <span>{log.trips.length}</span></li>
          </ul>
        </div>
        <div className="lg:col-span-3 bg-white p-3 md:p-6 lg:p-8 rounded-2xl shadow-xl">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">Earnings Breakdown</h3>
          <ul className="space-y-2 md:space-y-3 lg:space-y-4 text-xs md:text-sm lg:text-lg text-gray-600">
            <li className="flex justify-between gap-2">Drop-offs: <span>₹{dropoffBaseEarnings.toFixed(2)}</span></li>
            <li className="flex justify-between gap-2">Pick-ups: <span>₹{pickupBaseEarnings.toFixed(2)}</span></li>
            <li className="flex justify-between gap-2">Kilometers: <span>₹{kilometerEarnings.toFixed(2)}</span></li>
            <li className="flex justify-between gap-2 font-bold text-green-600 text-sm md:text-base lg:text-xl border-t pt-2 md:pt-3 lg:pt-4 mt-2 md:mt-3 lg:mt-4">Total Earnings: <span>₹{log.totalEarnings.toFixed(2)}</span></li>
            <li className="flex justify-between gap-2 text-red-600">Fuel Expense: <span>-₹{log.fuelExpense.toFixed(2)}</span></li>
            <li className="flex justify-between gap-2 font-bold text-blue-600 text-base md:text-lg lg:text-2xl border-t pt-2 md:pt-3 lg:pt-4 mt-2 md:mt-3 lg:mt-4">Net Earnings: <span>₹{netEarnings.toFixed(2)}</span></li>
          </ul>
        </div>
      </div>


      <div>
        <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">Trip Details</h3>
        <div className="bg-white rounded-2xl shadow-xl">
          <ul className="divide-y divide-gray-200">
            {log.trips.map((trip) => (
              <li key={trip.id} className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center space-x-3 md:space-x-6">
                  {trip.type === 'pickup' ? <TrendingUp size={24} className="text-green-500 md:w-7 md:h-7" /> : <TrendingDown size={24} className="text-red-500 md:w-7 md:h-7" />}
                  <div>
                    <p className="font-bold text-base md:text-xl text-gray-800">{trip.title}</p>
                    <p className="text-sm md:text-md text-gray-500 capitalize">{trip.type} - {trip.kilometers} km</p>
                  </div>
                </div>
                <p className="font-bold text-lg md:text-xl text-gray-800">₹{trip.earnings.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 md:mt-16 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        <Link
          to="/previous-logs"
          className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-xl flex items-center justify-center transform hover:scale-105 transition-transform"
        >
          <ArrowLeft size={20} className="mr-2 md:mr-3 md:w-6 md:h-6" />
          <span>View Previous Logs</span>
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-xl flex items-center justify-center transform hover:scale-105 transition-all shadow-lg"
          onClick={() => localStorage.removeItem('lastDayLog')}
        >
          <PlusCircle size={20} className="mr-2 md:mr-3 md:w-6 md:h-6" />
          <span>Start New Day</span>
        </Link>
      </div>
    </div>
  );
};

export default DailyLogBook;
