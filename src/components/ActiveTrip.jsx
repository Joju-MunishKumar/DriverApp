import { useState } from 'react';

const ActiveTrip = ({ trip, onComplete }) => {
  const [kilometers, setKilometers] = useState('');

  const handleComplete = () => {
    const km = parseFloat(kilometers);
    if (isNaN(km) || km <= 0) {
      alert('Please enter valid kilometers.');
      return;
    }
    onComplete(trip.id, km);
  };

  return (
    <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex-1">
          <p className="font-semibold text-base md:text-lg text-gray-800">{trip.title}</p>
          <p className="text-xs md:text-sm text-gray-500">Started at {new Date(trip.startTime).toLocaleTimeString()}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <input
            type="number"
            value={kilometers}
            onChange={(e) => setKilometers(e.target.value)}
            className="w-full sm:w-24 md:w-28 px-3 py-2 border-gray-300 border rounded-lg text-base md:text-lg"
            placeholder="kms"
          />
          <button onClick={handleComplete} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 md:px-6 rounded-lg text-sm md:text-base transform hover:scale-105 transition-transform whitespace-nowrap">
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveTrip;
