import axios from 'axios';
import { PLAYLIST } from '../routes/routes';

export const getPlaylists = async () => {
  try {
    const resp = await axios.get(PLAYLIST);
    const { data } = await resp;
    return data.playlists;
  } catch (err) {
    console.log('Get Playlists Error', err);
  }
};

export const addPlaylist = async (playlist, token) => {
  try {
    const {
      data: { playlists }
    } = await axios.post(
      PLAYLIST,
      { playlist },
      { headers: { authorization: token } }
    );
    return playlists;
  } catch (err) {
    console.log('PLAYLIST_POST_REQUEST_ERROR', err);
  }
};

export const deletePlaylist = async (id, token) => {
  try {
    const {
      data: { playlists }
    } = await axios.delete(`${PLAYLIST}/${id}`, {
      headers: {
        authorization: token
      }
    });
    return playlists;
  } catch (err) {
    console.log('PLAYLIST_DELETE_REQUEST_ERROR', err);
  }
};

