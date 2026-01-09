import { useState } from 'react';
import { X } from 'lucide-react';

const AddTripModal = ({ isOpen, onClose, onAddTrip }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('pickup');

  if (!isOpen) return null;
  console.log('AddTripModal is rendering with isOpen:', isOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTrip({
      id: Date.now(),
      title,
      type,
      kilometers: 0,
      earnings: 0,
      completed: false,
      startTime: new Date().toISOString(),
      endTime: null,
    });
    setTitle('');
    setType('pickup');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-lg transform transition-all border border-white/30 relative overflow-hidden">
        {/* Glassmorphism gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 drop-shadow-sm">Add New Trip</h2>
            <button
              onClick={onClose}
              className="text-gray-700 hover:text-gray-900 transition-colors bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div>
                <label htmlFor="title" className="block text-lg font-semibold text-gray-900 mb-2 drop-shadow-sm">
                  Trip Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 text-lg bg-white/40 backdrop-blur-md border-2 border-white/50 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all placeholder-gray-600 text-gray-900 shadow-lg"
                  placeholder="e.g., Airport Drop-off"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-lg font-semibold text-gray-900 mb-2 drop-shadow-sm">
                  Trip Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 text-lg bg-white/40 backdrop-blur-md border-2 border-white/50 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all text-gray-900 shadow-lg"
                >
                  <option value="pickup">Pickup</option>
                  <option value="drop-off">Drop-off</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-white/40 backdrop-blur-md hover:bg-white/60 text-gray-900 font-bold py-3 px-8 rounded-xl text-lg transition-all border border-white/50 shadow-lg hover:shadow-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-2xl border border-white/30"
              >
                Save Trip
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTripModal;
