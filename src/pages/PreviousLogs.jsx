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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">All Saved Logs</h2>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center transform hover:scale-105 transition-transform"
          onClick={() => localStorage.removeItem('lastDayLog')}
        >
          <PlusCircle size={22} className="mr-2" />
          Start New Day
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-xl">
        <ul className="divide-y divide-gray-200">
          {logs.length > 0 ? (
            logs.map((log) => (
              <li key={log.id}>
                <Link to={`/logbook/${log.id}`} className="block p-8 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-xl text-gray-800">{log.driverName} - {new Date(log.date).toLocaleDateString()}</p>
                      <p className="text-md text-gray-600 mt-2">
                        {log.trips.length} trips · <span className="font-semibold">₹{log.totalEarnings.toFixed(2)}</span> · {log.totalKilometers} km · {getWorkHours(log.startTime, log.endTime)}
                      </p>
                    </div>
                    <ChevronRight size={28} className="text-gray-400" />
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="p-10 text-center text-gray-500 text-lg">No logs have been saved yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PreviousLogs;
