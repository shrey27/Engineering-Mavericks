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
import SinglePlaylistVideos from '../pages/playlist/SinglePlaylistVideos';
import WatchLater from '../pages/watchlater';
import NotFound from '../pages/notfound';

// API Endpoints
export const GETCATEGORIES = '/api/categories';
export const GETVIDEOS = '/api/videos';
export const SIGN_UP = '/api/auth/signup';
export const SIGN_IN = '/api/auth/login';
export const GETLIKED = '/api/user/likes';
export const GETHISTORY = '/api/user/history';
export const WATCHLATER = '/api/user/watchlater';
export const PLAYLISTSAPI = '/api/user/playlists';

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
export const PLAYLIST = '/playlists';
export const HISTORY = '/history';
export const WATCH = '/watchlater';

export const availableRoutes = (
  <Routes>
    {/* <Route path={TWITTER}>{window.location.replace(TWITTEREXT)}</Route>
    <Route path={GITHUB}>{window.location.replace(GITHUBEXT)}</Route>
    <Route path={LINKEDIN}>{window.location.replace(LINKEDINEXT)}</Route> */}

    <Route exact path={LANDING} element={<Landing />} />
    <Route exact path={MOCKMAN} element={<MockAPI />} />
    <Route exact path={VIDEOS} element={<VideoListing />} />
    <Route exact path={SIGNIN} element={<Signin />} />
    <Route exact path={SIGNUP} element={<Signup />} />
    <Route path='*' element={<NotFound />} />

    <Route exact path={LANDING} element={<PrivateRoute />}>
      <Route exact path={PLAYLIST} element={<Playlist />} />
      <Route
        path={`${PLAYLIST}/:playlistId`}
        element={<SinglePlaylistVideos />}
      />
      <Route exact path={LIKED} element={<Liked />} />
      <Route exact path={HISTORY} element={<History />} />
      <Route exact path={WATCH} element={<WatchLater />} />
      <Route exact path={`${VIDEOS}/:videoId`} element={<SingleVideo />} />
    </Route>
  </Routes>
);
