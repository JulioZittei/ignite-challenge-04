import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

const RouteList = (): JSX.Element => (
  <Routes>
    <Route path="/" caseSensitive={true} element={<Dashboard />} />
  </Routes>
);

export default RouteList;
