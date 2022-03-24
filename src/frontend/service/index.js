import axios from 'axios';
import { GETCATEGORIES, GETVIDEOS, SIGN_IN, SIGN_UP } from '../routes/routes';

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
  }
};
