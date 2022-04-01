import axios from 'axios';
import { WATCHLATER } from '../routes/routes';

export const getWatchLaterVideos = async (token) => {
  try {
    const {
      data: { watchlater }
    } = await axios.get(WATCHLATER, {
      headers: {
        authorization: token
      }
    });
    return watchlater;
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
