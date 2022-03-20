import { Routes, Route } from 'react-router-dom';
import Landing from './frontend/landing';
import MockAPI from './MockMan';
// API Endpoints
export const GETCATEGORIES = '/api/categories';

// Routes
export const LANDING = '/';
export const MOCKMAN = '/mockman';

export const availableRoutes = (
  <Routes>
    <Route path={LANDING} element={<Landing />} />
    <Route path={MOCKMAN} element={<MockAPI />} />
  </Routes>
);
