import { DollarSign, Route, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
    <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
    <div>
      <h3 className="text-slate-500 font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default StatCard;
