import axios from 'axios';
import { PLAYLISTSAPI } from '../routes/routes';

//Function to perform CRUD on playlists
export const getPlaylists = async (token) => {
  try {
    const {
      data: { playlists }
    } = await axios.get(PLAYLISTSAPI, { headers: { authorization: token } });

    return playlists;
  } catch (err) {
    console.log('PLAYLIST_GET_REQUEST_ERROR', err);
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

//Function to perform CRUD operations on videos inside a playlist
export const getVideosOfPlaylist = async (id, token) => {
  try {
    const {
      data: { playlist }
    } = await axios.get(`${PLAYLISTSAPI}/${id}`, {
      headers: { authorization: token }
    });
    return playlist;
  } catch (err) {
    console.log('PLAYLIST_GET_VIDEO_REQUEST_ERROR', err);
  }
};

export const addVideoToPlaylist = async (id, video, token) => {
  try {
    const {
      data: { playlist }
    } = await axios.post(
      `${PLAYLISTSAPI}/${id}`,
      { video },
      { headers: { authorization: token } }
    );
    return playlist;
  } catch (err) {
    console.log('PLAYLIST_POST_VIDEO_REQUEST_ERROR', err);
  }
};

export const deleteVideoFromPlaylist = async (id, videoId, token) => {
  try {
    const {
      data: { playlist }
    } = await axios.delete(`${PLAYLISTSAPI}/${id}/${videoId}`, {
      headers: {
        authorization: token
      }
    });
    return playlist;
  } catch (err) {
    console.log('PLAYLIST_DELETE_VIDEO_REQUEST_ERROR', err);
  }
};
