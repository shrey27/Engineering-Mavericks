import axios from 'axios';
import { GETLIKED } from '../routes/routes';

export const getLikedVideos = async (token) => {
  try {
    const {
      data: { likes }
    } = await axios.get(GETLIKED, {
      headers: {
        authorization: token
      }
    });
    return likes;
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
