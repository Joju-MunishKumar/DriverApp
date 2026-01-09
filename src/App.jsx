import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StartDay from './pages/StartDay';
import ActiveDayDashboard from './pages/ActiveDayDashboard';
import EndDay from './pages/EndDay';
import DailyLogBook from './pages/DailyLogBook';
import PreviousLogs from './pages/PreviousLogs';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StartDay />} />
          <Route path="dashboard" element={<ActiveDayDashboard />} />
          <Route path="end-day" element={<EndDay />} />
          <Route path="logbook" element={<DailyLogBook />} />
          <Route path="logbook/:id" element={<DailyLogBook />} />
          <Route path="previous-logs" element={<PreviousLogs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
