const InfoCard = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-slate-100 p-3 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      </div>
      <div className="space-y-2 text-slate-600">{children}</div>
    </div>
  );

  export default InfoCard;
