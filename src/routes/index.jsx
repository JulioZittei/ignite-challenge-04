import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

const RouteList = () => (
  <Routes>
    <Route path="/" caseSensitive={true} element={<Dashboard />} />
  </Routes>
);

export default RouteList;
