import { Routes, Route } from 'react-router-dom';
import Landing from './frontend/landing';
import MockAPI from './MockMan';
import VideoListing from './frontend/videos';

// API Endpoints
export const GETCATEGORIES = '/api/categories';

// Routes
export const LANDING = '/';
export const MOCKMAN = '/mockman';
export const SIGNIN = '/signin';
export const SIGNUP = '/signup';
export const VIDEOS = '/videolisting';

export const availableRoutes = (
  <Routes>
    <Route path={LANDING} element={<Landing />} />
    <Route path={MOCKMAN} element={<MockAPI />} />
    <Route path={VIDEOS} element={<VideoListing />} />
  </Routes>
);
