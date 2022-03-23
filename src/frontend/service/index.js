import axios from 'axios';
import { GETCATEGORIES, GETVIDEOS } from '../routes/routes';

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
