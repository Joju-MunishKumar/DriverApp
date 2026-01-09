import { DollarSign, Route, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-3 md:p-6 rounded-xl shadow-md flex items-center gap-2 md:gap-4">
    <div className="bg-blue-100 p-2 md:p-3 rounded-full flex-shrink-0">{icon}</div>
    <div className="min-w-0 flex-1">
      <h3 className="text-xs md:text-sm text-slate-500 font-medium truncate">{title}</h3>
      <p className="text-lg md:text-2xl font-bold text-slate-800 truncate">{value}</p>
    </div>
  </div>
);

export default StatCard;
