import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bike } from 'lucide-react';

const StartDay = () => {
  const [driverName, setDriverName] = useState('');
  const [transform, setTransform] = useState('');
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleStartDay = () => {
    if (driverName.trim() === '') {
      alert('Please enter your name');
      return;
    }
    const activeDay = {
      driverName,
      startTime: new Date().toISOString(),
      trips: [],
    };
    localStorage.setItem('activeDay', JSON.stringify(activeDay));
    navigate('/dashboard');
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div className="flex flex-col items-center justify-center pt-16 relative overflow-hidden min-h-[calc(100vh-200px)]">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-60"></div>

      {/* Floating circles for depth */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-md text-center relative z-10 transition-all duration-200 ease-out"
        style={{ transform }}
      >
        {/* Animated icon with floating effect */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-full shadow-2xl animate-float">
              <Bike size={56} className="text-white relative" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <h2 className="text-5xl font-bold mb-4 text-gray-800 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
          RideLog Pro
        </h2>
        <p className="text-gray-600 mb-8 text-lg">Track your rides, earnings, and kilometers with ease.</p>

        <div className="mb-6">
          <input
            type="text"
            id="driverName"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStartDay()}
            className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300 bg-white/80 backdrop-blur-sm"
            placeholder="e.g., John Doe"
          />
        </div>

        <button
          onClick={handleStartDay}
          className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:via-amber-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Bike size={24} />
            Start Riding
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <p className="text-sm text-gray-500 mt-6">
          No registration required. Your data is saved on this device.
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default StartDay;
