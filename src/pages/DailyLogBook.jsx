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
    <div>
      <div className="bg-gradient-to-br from-indigo-700 to-purple-800 p-8 rounded-2xl shadow-2xl mb-10 text-white">
        <h2 className="text-5xl font-bold mb-2">Daily Log for {log.driverName}</h2>
        <p className="text-xl opacity-90">{new Date(log.date).toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <InfoCard icon={<TrendingUp size={32} className="text-purple-600" />} title="Drop-offs">
          <p className="text-3xl font-bold">{log.dropoffCount}</p>
        </InfoCard>
        <InfoCard icon={<TrendingDown size={32} className="text-purple-600" />} title="Pick-ups">
          <p className="text-3xl font-bold">{log.pickupCount}</p>
        </InfoCard>
        <InfoCard icon={<DollarSign size={32} className="text-green-600" />} title="Total Earnings">
          <p className="text-3xl font-bold">₹{log.totalEarnings.toFixed(2)}</p>
        </InfoCard>
        <InfoCard icon={<Route size={32} className="text-blue-600" />} title="Kilometers">
          <p className="text-3xl font-bold">{log.totalKilometers} km</p>
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Day Summary</h3>
          <ul className="space-y-4 text-lg text-gray-600">
            <li className="flex justify-between"><strong>Work Hours:</strong> <span>{getWorkHours(log.startTime, log.endTime)}</span></li>
            <li className="flex justify-between"><strong>Fuel Consumed:</strong> <span>₹{log.fuelExpense.toFixed(2)}</span></li>
            <li className="flex justify-between"><strong>Started Time:</strong> <span>{new Date(log.startTime).toLocaleTimeString()}</span></li>
            <li className="flex justify-between"><strong>Ended Time:</strong> <span>{new Date(log.endTime).toLocaleTimeString()}</span></li>
            <li className="flex justify-between"><strong>Total Trips:</strong> <span>{log.trips.length}</span></li>
          </ul>
        </div>
        <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Earnings Breakdown</h3>
          <ul className="space-y-4 text-lg text-gray-600">
            <li className="flex justify-between">Drop-offs: <span>₹{dropoffBaseEarnings.toFixed(2)}</span></li>
            <li className="flex justify-between">Pick-ups: <span>₹{pickupBaseEarnings.toFixed(2)}</span></li>
            <li className="flex justify-between">Kilometers: <span>₹{kilometerEarnings.toFixed(2)}</span></li>
            <li className="flex justify-between font-bold text-green-600 text-xl border-t pt-4 mt-4">Total Earnings: <span>₹{log.totalEarnings.toFixed(2)}</span></li>
            <li className="flex justify-between text-red-600">Fuel Expense: <span>-₹{log.fuelExpense.toFixed(2)}</span></li>
            <li className="flex justify-between font-bold text-blue-600 text-2xl border-t pt-4 mt-4">Net Earnings: <span>₹{netEarnings.toFixed(2)}</span></li>
          </ul>
        </div>
      </div>


      <div>
        <h3 className="text-4xl font-bold text-gray-800 mb-6">Trip Details</h3>
        <div className="bg-white rounded-2xl shadow-xl">
          <ul className="divide-y divide-gray-200">
            {log.trips.map((trip) => (
              <li key={trip.id} className="p-6 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                  {trip.type === 'pickup' ? <TrendingUp size={28} className="text-green-500" /> : <TrendingDown size={28} className="text-red-500" />}
                  <div>
                    <p className="font-bold text-xl text-gray-800">{trip.title}</p>
                    <p className="text-md text-gray-500 capitalize">{trip.type} - {trip.kilometers} km</p>
                  </div>
                </div>
                <p className="font-bold text-xl text-gray-800">₹{trip.earnings.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex justify-center space-x-6">
        <Link
          to="/previous-logs"
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-xl flex items-center transform hover:scale-105 transition-transform"
        >
          <ArrowLeft size={24} className="mr-3" />
          View Previous Logs
        </Link>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl flex items-center transform hover:scale-105 transition-transform"
          onClick={() => localStorage.removeItem('lastDayLog')}
        >
          <PlusCircle size={24} className="mr-3" />
          Start New Day
        </Link>
      </div>
    </div>
  );
};

export default DailyLogBook;
