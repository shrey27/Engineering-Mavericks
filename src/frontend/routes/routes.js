import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MockAPI from '../../MockMan';
import Landing from '../pages/landing';
import VideoListing from '../pages/videos';
import SingleVideo from '../pages/singleVideo';
import Signin from '../pages/authentication/Signin';
import Signup from '../pages/authentication/Signup';
import Liked from '../pages/liked';
import History from '../pages/history';
import Playlist from '../pages/playlist';

// API Endpoints
export const GETCATEGORIES = '/api/categories';
export const GETVIDEOS = '/api/videos';
export const SIGN_UP = '/api/auth/signup';
export const SIGN_IN = '/api/auth/login';

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
export const LIKED = '/liked';
export const PLAYLIST = '/playlist';
export const HISTORY = '/history';

export const availableRoutes = (
  <Routes>
    {/* <Route path={TWITTER}>{window.location.replace(TWITTEREXT)}</Route>
    <Route path={GITHUB}>{window.location.replace(GITHUBEXT)}</Route>
    <Route path={LINKEDIN}>{window.location.replace(LINKEDINEXT)}</Route> */}

    <Route path={LANDING} element={<Landing />} />
    <Route path={MOCKMAN} element={<MockAPI />} />
    <Route path={VIDEOS} element={<VideoListing />} />
    <Route path={LIKED} element={<Liked />} />

    <Route path={LANDING} element={<PrivateRoute />}>
      <Route path={PLAYLIST} element={<Playlist />} />
      <Route path={HISTORY} element={<History />} />
      <Route path={`${VIDEOS}/:videoId`} element={<SingleVideo />} />
    </Route>

    <Route path={SIGNIN} element={<Signin />} />
    <Route path={SIGNUP} element={<Signup />} />
    <Route path='*' element={<Landing />} />
  </Routes>
);
