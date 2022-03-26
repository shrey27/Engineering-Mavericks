import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuthCtx } from './index';
import { getPlaylists, addPlaylist, deletePlaylist } from '../service';
import { useLocalStorage } from '../helpers';
// import { historyReducerFunction, historyDefaultState } from '../helpers';

const PlaylistContext = createContext();

export const playlistDefaultState = {
  playloaderLoader: false,
  playlists: []
};
export const playlistReducerFunction = (state, action) => {
  switch (action.type) {
    case 'PLAYLIST_API_REQUEST':
      return {
        ...state,
        playloaderLoader: true
      };
    case 'PLAYLIST_API_RESPONSE':
      return {
        ...state,
        playlists: action.payload,
        playloaderLoader: false
      };
    default:
      return {
        ...state
      };
  }
};

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
    dispatch({ type: 'PLAYLIST_API_RESPONSE' });
    const { playlists } = state;
    if (playlists?.findIndex((e) => e.playlistName === item.playlistName) < 0) {
      const playlistsArray = await addPlaylist(item, token);
      updateLocalStorage('playlists', playlistsArray);
      dispatch({ type: 'PLAYLIST_API_RESPONSE', payload: [...playlistsArray] });
    }
  };

  useEffect(() => {
    const getPlaylistsFunction = async () => {
      dispatch({ type: 'PLAYLIST_API_REQUEST' });

      const playlistsArray = await getPlaylists(token);
      console.log('playlistsArray', playlistsArray);
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
