import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuthCtx } from './index';
import { getPlaylists, addPlaylist, deletePlaylist } from '../service';
import { useLocalStorage } from '../helpers';
import { playlistReducerFunction, playlistDefaultState } from '../helpers';

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    playlistReducerFunction,
    playlistDefaultState
  );
  const { token } = useAuthCtx();
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
        addPlaylistFunction
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylistCtx = () => useContext(PlaylistContext);

export { usePlaylistCtx, PlaylistProvider };