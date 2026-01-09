const InfoCard = ({ icon, title, children }) => (
  <div className="bg-white p-3 md:p-6 rounded-xl shadow-md">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-3 md:mb-4">
      <div className="bg-slate-100 p-2 md:p-3 rounded-full flex-shrink-0">{icon}</div>
      <h3 className="text-sm md:text-lg lg:text-xl font-bold text-slate-800 break-words">{title}</h3>
    </div>
    <div className="space-y-2 text-slate-600 text-sm md:text-base">{children}</div>
  </div>
);

export default InfoCard;
