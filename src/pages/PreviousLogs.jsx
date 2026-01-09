import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, PlusCircle } from 'lucide-react';
import { getWorkHours } from '../utils/helpers';


const PreviousLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    // Get current user from active day or last log
    const activeDay = JSON.parse(localStorage.getItem('activeDay'));
    const lastLog = JSON.parse(localStorage.getItem('lastDayLog'));
    const userName = activeDay?.driverName || lastLog?.driverName || '';

    setCurrentUser(userName);

    // Get all logs and filter by current user
    const allLogs = JSON.parse(localStorage.getItem('allDayLogs')) || [];
    const userLogs = userName ? allLogs.filter(log => log.driverName === userName) : allLogs;
    setLogs(userLogs);
    setLoading(false);
  }, []);


  if (loading) return <p className="text-center text-slate-500">Loading logs...</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">All Saved Logs</h2>
        <Link
          to="/"
          className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transform hover:scale-105 transition-all shadow-lg"
          onClick={() => localStorage.removeItem('lastDayLog')}
        >
          <PlusCircle size={20} className="mr-2" />
          <span className="text-sm md:text-base">Start New Day</span>
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-xl">
        <ul className="divide-y divide-gray-200">
          {logs.length > 0 ? (
            logs.map((log) => (
              <li key={log.id}>
                <Link to={`/logbook/${log.id}`} className="block p-4 md:p-8 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base md:text-xl text-gray-800 truncate">{log.driverName} - {new Date(log.date).toLocaleDateString()}</p>
                      <p className="text-sm md:text-md text-gray-600 mt-1 md:mt-2">
                        {log.trips.length} trips · <span className="font-semibold">₹{log.totalEarnings.toFixed(2)}</span> · {log.totalKilometers} km · {getWorkHours(log.startTime, log.endTime)}
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 flex-shrink-0 md:w-7 md:h-7" />
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="p-6 md:p-10 text-center text-gray-500 text-sm md:text-lg">No logs have been saved yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PreviousLogs;
