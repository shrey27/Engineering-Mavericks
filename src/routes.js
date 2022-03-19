import { Routes, Route } from 'react-router-dom';
import Landing from './frontend/landing';

export const LANDING = '/';

export const availableRoutes = (
  <Routes>
    <Route path={LANDING} element={<Landing />} />
  </Routes>
);
