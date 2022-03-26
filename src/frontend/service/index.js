import axios from 'axios';
import {
  GETCATEGORIES,
  GETVIDEOS,
  SIGN_IN,
  SIGN_UP,
  GETLIKED,
  GETHISTORY,
  WATCHLATER
} from '../routes/routes';
const errorStatements = {
  signin: 'User Not Found. Either Sign-up or try again later',
  signup: 'Sign Up Failed! Use different credentials or Try again later!'
};

export const getCategories = async () => {
  try {
    const resp = await axios.get(GETCATEGORIES);
    const { data } = await resp;
    return data.categories;
  } catch (err) {
    console.log('Landing Error', err);
  }
};

export const getVideos = async () => {
  try {
    const {
      data: { videos }
    } = await axios.get(GETVIDEOS);
    return videos;
  } catch (err) {
    console.log('Videos Error', err);
  }
};

export const signUpApi = async (username, email, password) => {
  try {
    const response = await axios.post(SIGN_UP, {
      name: username.split(' ')[0],
      surname: username.split(' ')[1],
      email,
      password
    });
    return response;
  } catch (err) {
    console.log('SIGNUP-ERROR', err);
    return {
      error: errorStatements.signup
    };
  }
};

export const signInApi = async (email, password) => {
  try {
    const response = await axios.post(SIGN_IN, {
      email,
      password
    });
    return response;
  } catch (err) {
    console.log('SIGNIN-ERROR', err);
    return {
      error: errorStatements.signin
    };
  }
};

export const getLikedVideos = async (token) => {
  try {
    const storedLikes = JSON.parse(localStorage.getItem('userData'))?.likes;
    if (storedLikes) {
      return storedLikes;
    } else {
      const {
        data: { likes }
      } = await axios.get(GETLIKED, {
        headers: {
          authorization: token
        }
      });
      return likes;
    }
  } catch (err) {
    console.log('LIKED_GET_REQUEST_ERROR', err);
  }
};

export const addLikedVideo = async (video, token) => {
  try {
    const {
      data: { likes }
    } = await axios.post(
      GETLIKED,
      { video },
      {
        headers: {
          authorization: token
        }
      }
    );
    return likes;
  } catch (err) {
    console.log('LIKED_POST_REQUEST_ERROR', err);
  }
};

export const deleteLikedVideo = async (id, token) => {
  try {
    const {
      data: { likes }
    } = await axios.delete(`${GETLIKED}/${id}`, {
      headers: {
        authorization: token
      }
    });
    return likes;
  } catch (err) {
    console.log('LIKED_DELETE_REQUEST_ERROR', err);
  }
};

export const getHistoryVideos = async (token) => {
  try {
    const storedHistory = JSON.parse(localStorage.getItem('userData'))?.history;
    if (storedHistory) {
      return storedHistory;
    } else {
      const {
        data: { history }
      } = await axios.get(GETHISTORY, {
        headers: {
          authorization: token
        }
      });
      return history;
    }
  } catch (err) {
    console.log('HISTORY_GET_REQUEST_ERROR', err);
  }
};

export const addToHistory = async (video, token) => {
  try {
    const {
      data: { history }
    } = await axios.post(
      GETHISTORY,
      { video },
      { headers: { authorization: token } }
    );
    return history;
  } catch (err) {
    console.log('HISTORY_POST_REQUEST_ERROR', err);
  }
};

export const deleteFromHistory = async (id, token) => {
  try {
    const {
      data: { history }
    } = await axios.delete(`${GETHISTORY}/${id}`, {
      headers: {
        authorization: token
      }
    });
    return history;
  } catch (err) {
    console.log('HISTORY_DELETE_REQUEST_ERROR', err);
  }
};

export const clearHistory = async (token) => {
  try {
    const {
      data: { history }
    } = await axios.delete(`${GETHISTORY}/all`, {
      headers: {
        authorization: token
      }
    });
    return history;
  } catch (err) {
    console.log('CLEAR_ALL_HISTORY_REQUEST_ERROR', err);
  }
};

export const getWatchLaterVideos = async (token) => {
  try {
    const storedWatchlater = JSON.parse(
      localStorage.getItem('userData')
    )?.history;
    if (storedWatchlater) {
      return storedWatchlater;
    } else {
      const {
        data: { watchlater }
      } = await axios.get(WATCHLATER, {
        headers: {
          authorization: token
        }
      });
      return watchlater;
    }
  } catch (err) {
    console.log('WATCH_LATER_GET_REQUEST_ERROR', err);
  }
};

export const addToWatchLater = async (video, token) => {
  try {
    const {
      data: { watchlater }
    } = await axios.post(
      WATCHLATER,
      { video },
      { headers: { authorization: token } }
    );
    return watchlater;
  } catch (err) {
    console.log('WATCH_LATER_POST_REQUEST_ERROR', err);
  }
};

export const deleteFromWatchLater = async (id, token) => {
  try {
    const {
      data: { watchlater }
    } = await axios.delete(`${WATCHLATER}/${id}`, {
      headers: {
        authorization: token
      }
    });
    return watchlater;
  } catch (err) {
    console.log('WATCH_LATER_DELETE_REQUEST_ERROR', err);
  }
};

export const clearWatchLater = async (token) => {
  try {
    const {
      data: { watchlater }
    } = await axios.delete(`${WATCHLATER}/all`, {
      headers: {
        authorization: token
      }
    });
    return watchlater;
  } catch (err) {
    console.log('CLEAR_ALL_WATCH_LATER_REQUEST_ERROR', err);
  }
};
