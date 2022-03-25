import axios from 'axios';
import {
  GETCATEGORIES,
  GETVIDEOS,
  SIGN_IN,
  SIGN_UP,
  GETLIKED
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
