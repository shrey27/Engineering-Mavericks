import { Routes, Route } from 'react-router-dom';
import Landing from './frontend/landing';
import MockAPI from './MockMan';
import VideoListing from './frontend/videos';

// API Endpoints
export const GETCATEGORIES = '/api/categories';
export const GETVIDEOS = '/api/videos';

// Routes
export const TWITTEREXT = 'https://twitter.com/home';
export const LINKEDINEXT = 'https://www.linkedin.com/in/shrey27';
export const GITHUBEXT = 'https://github.com/shrey27';

export const TWITTER = '/twitter';
export const LINKEDIN = '/linkedin';
export const GITHUB = '/github';
export const LANDING = '/';
export const MOCKMAN = '/mockman';
export const SIGNIN = '/signin';
export const SIGNUP = '/signup';
export const VIDEOS = '/videolisting';

export const availableRoutes = (
  <Routes>
    {/* <Route path={TWITTER}>{window.location.replace(TWITTEREXT)}</Route>
    <Route path={GITHUB}>{window.location.replace(GITHUBEXT)}</Route>
    <Route path={LINKEDIN}>{window.location.replace(LINKEDINEXT)}</Route> */}
    <Route path={LANDING} element={<Landing />} />
    <Route path={MOCKMAN} element={<MockAPI />} />
    <Route path={VIDEOS} element={<VideoListing />} />
  </Routes>
);
