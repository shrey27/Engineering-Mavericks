import axios from 'axios';
import { PLAYLISTSAPI } from '../routes/routes';

export const getPlaylists = async () => {
  try {
    const {
      data: { playlists }
    } = await axios.get(PLAYLISTSAPI);

    return playlists;
  } catch (err) {
    console.log('Get Playlists Error', err);
  }
};

export const addPlaylist = async (playlist, token) => {
  try {
    const {
      data: { playlists }
    } = await axios.post(
      PLAYLISTSAPI,
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
    } = await axios.delete(`${PLAYLISTSAPI}/${id}`, {
      headers: {
        authorization: token
      }
    });
    return playlists;
  } catch (err) {
    console.log('PLAYLIST_DELETE_REQUEST_ERROR', err);
  }
};
