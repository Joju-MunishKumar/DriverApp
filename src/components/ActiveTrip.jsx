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
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg text-gray-800">{trip.title}</p>
          <p className="text-sm text-gray-500">Started at {new Date(trip.startTime).toLocaleTimeString()}</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={kilometers}
            onChange={(e) => setKilometers(e.target.value)}
            className="w-28 px-3 py-2 border-gray-300 border rounded-lg text-lg"
            placeholder="kms"
          />
          <button onClick={handleComplete} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg text-lg transform hover:scale-105 transition-transform">
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveTrip;
