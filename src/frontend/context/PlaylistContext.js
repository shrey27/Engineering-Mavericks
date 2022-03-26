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
    }
  };

  const deleteVideoFromPlaylistsFunction = async (id) => {
    dispatch({ type: 'PLAYLIST_API_REQUEST' });
    const playlistArray = await deleteVideoFromPlaylist(id, videoToadd, token);
    console.log('playlis', playlistArray);
    updateLocalStorage('playlists', playlistArray);
    dispatch({ type: 'PLAYLIST_API_RESPONSE', payload: [...playlistArray] });
  };

  const addVideoToPlaylistsFunction = async (id) => {
    dispatch({ type: 'PLAYLIST_API_REQUEST' });
    const singlePlaylist = await addVideoToPlaylist(id, videoToadd, token);
    const arr = [...playlists];
    const index = arr.findIndex((e) => e._id === singlePlaylist._id);
    arr[index] = { ...singlePlaylist };
    updateLocalStorage('playlists', arr);
    dispatch({ type: 'PLAYLIST_API_RESPONSE', payload: [...arr] });
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
