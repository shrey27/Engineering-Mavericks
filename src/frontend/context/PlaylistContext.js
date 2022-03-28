import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuthCtx } from './index';
import {
  getPlaylists,
  addPlaylist,
  deletePlaylist,
  getVideosOfPlaylist,
  addVideoToPlaylist,
  deleteVideoFromPlaylist
} from '../service';
import { useLocalStorage } from '../helpers';
import { playlistReducerFunction, playlistDefaultState } from '../helpers';
import { useSingleVideo } from '../helpers';
import { ToastMessage } from '../components';

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    playlistReducerFunction,
    playlistDefaultState
  );
  const { videoId, playlists } = state;
  const { token } = useAuthCtx();
  const videoToadd = useSingleVideo(videoId);
  const { updateLocalStorage } = useLocalStorage();

  const deletePlaylistFunction = async (id) => {
    dispatch({ type: 'PLAYLIST_API_REQUEST' });
    const playlistsArray = await deletePlaylist(id, token);
    updateLocalStorage('playlists', playlistsArray);
    dispatch({ type: 'PLAYLIST_API_RESPONSE', payload: [...playlistsArray] });
    ToastMessage('Playlist was deleted', 'error');
  };

  const addPlaylistFunction = async (item) => {
    const { playlists } = state;
    const name = item.playlistName;
    if (
      name.trim().length > 0 &&
      playlists?.findIndex((e) => e.playlistName === name.trim()) < 0
    ) {
      dispatch({ type: 'PLAYLIST_API_REQUEST' });
      const playlistsArray = await addPlaylist(item, token);
      updateLocalStorage('playlists', playlistsArray);
      dispatch({ type: 'PLAYLIST_API_RESPONSE', payload: [...playlistsArray] });
      ToastMessage('Playlist created successfully', 'success');
    }
  };

  const deleteVideoFromPlaylistsFunction = async (id, videoId) => {
    dispatch({ type: 'PLAYLIST_API_REQUEST' });
    const singlePlaylist = await deleteVideoFromPlaylist(
      id,
      videoId ?? videoToadd._id,
      token
    );
    const arr = [...playlists];
    const index = arr.findIndex((e) => e._id === singlePlaylist._id);
    arr[index] = { ...singlePlaylist };
    updateLocalStorage('playlists', arr);
    dispatch({ type: 'PLAYLIST_API_RESPONSE', payload: arr });
    ToastMessage('Video deleted form the playlist', 'error');
  };

  const addVideoToPlaylistsFunction = async (id) => {
    dispatch({ type: 'PLAYLIST_API_REQUEST' });
    const playlist = state.playlists.find((elem) => elem._id === id);
    const { videos } = playlist;
    if (!videos.some((e) => e._id === videoToadd._id)) {
      const singlePlaylist = await addVideoToPlaylist(id, videoToadd, token);
      const arr = [...playlists];
      const index = arr.findIndex((e) => e._id === singlePlaylist._id);
      arr[index] = { ...singlePlaylist };
      updateLocalStorage('playlists', arr);
      dispatch({ type: 'PLAYLIST_API_RESPONSE', payload: arr });
      ToastMessage('Video added to the playlist', 'success');
    } else {
      dispatch({ type: 'CLOSE_LOADER' });
      ToastMessage('Video is already in the playlist', 'info');
    }
  };

  useEffect(() => {
    const getPlaylistsFunction = async () => {
      dispatch({ type: 'PLAYLIST_API_REQUEST' });
      const playlistsArray = await getPlaylists(token);
      dispatch({
        type: 'PLAYLIST_API_RESPONSE',
        payload: playlistsArray?.length ? [...playlistsArray] : []
      });
      const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
      datatoUpdate.playlists = [...playlistsArray];
      localStorage.setItem('userData', JSON.stringify(datatoUpdate));
    };
    if (token) {
      getPlaylistsFunction();
    }
  }, [token]);

  return (
    <PlaylistContext.Provider
      value={{
        state,
        dispatch,
        deletePlaylistFunction,
        addPlaylistFunction,
        getVideosOfPlaylist,
        addVideoToPlaylistsFunction,
        deleteVideoFromPlaylistsFunction
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylistCtx = () => useContext(PlaylistContext);

export { usePlaylistCtx, PlaylistProvider };
